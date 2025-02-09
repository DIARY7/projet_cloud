package mg.cloud.projets5.services;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteBatch;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.cloud.FirestoreClient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mg.cloud.projets5.dto.AchatVenteFond;
import mg.cloud.projets5.dto.coursCrypto.CoursCryptoDTO;
import mg.cloud.projets5.entity.Crypto;
import mg.cloud.projets5.entity.PrixCrypto;
import mg.cloud.projets5.entity.TransactionCrypto;
import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.utils.ProjectUtils;

@Service
public class SynchronisationService {

    @Autowired
    UsersService usersService;

    @Autowired
    CryptoService cryptoService;

    @Autowired
    TransactionCryptoService transactionCryptoService;

    @Autowired
    TransactionFondService transactionFondService;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Scheduled(fixedRate = 60000)
    public void synchroToLocalAndOnline() throws Exception {

        Firestore db = FirestoreClient.getFirestore();
        LocalDateTime lastSynchro = getLastSync();
        synchroToLocal(db);
        synchroToOnline(lastSynchro,db);
        updateDate();
    }

    public void synchroToLocal(Firestore db) throws Exception {
        CollectionReference collection = db.collection("transaction_fond_demande");
    
        // Obtenir tous les documents de la collection
        ApiFuture<QuerySnapshot> query = collection.get();
        List<QueryDocumentSnapshot> documents = query.get().getDocuments();
    
        // Vérification si la collection est vide
        if (documents.isEmpty()) {
            System.out.println("Aucune transaction à synchroniser.");
            return;
        }
    
        List<TransactionFondDemande> transactions = new ArrayList<>();
    
        for (QueryDocumentSnapshot doc : documents) {
            // Transformer chaque document en TransactionFondDemande
            TransactionFondDemande transaction = new TransactionFondDemande();
            transaction.setId(doc.getId());
            transaction.setEntree(doc.getDouble("entree"));
            transaction.setSortie(doc.getDouble("sortie"));
            transaction.setDtTransaction(
                doc.getTimestamp("dt_transaction").toDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime()
            );
            Users users = new Users();
            users.setId(doc.getLong("user_id").intValue());
            transaction.setUsers(users);
    
            transactions.add(transaction);
        }
    
        // Enregistrer les transactions dans la base locale
        transactionFondService.saveAll(transactions);
    
        // Effacer les documents après synchronisation
        clearCollection("transaction_fond_demande", db);
        System.out.println("Synchronisation vers la base locale terminée. Documents traités : " + transactions.size());
    }
    
    

    private void synchroToOnline(LocalDateTime lastSync,Firestore db) throws Exception {
        
        localToFirestoreUsers(lastSync, db);
        // crypto
        // localToFirestoreCrypto(db);
        // prix_crypto
        localToFirestorePrixCrypto(db);
        // transactio_crypto 
        localToFirestoretransactionCrypto(lastSync,db);
        // portefeuille

        localToFirestorePortefeuille(db);
        
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    class DocumentPortefeuille {
        private Integer user_id;
        private Double valeur;
    }
    private void localToFirestorePortefeuille(Firestore db) throws InterruptedException, ExecutionException{
        CollectionReference collection = db.collection("porte_feuille");
        List<AchatVenteFond> achatVenteFonds = transactionCryptoService.filterAchatVenteFond(null);

        // Lire les documents existants
        ApiFuture<QuerySnapshot> querySnapshot = collection.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

        // Mapping des données Firestore
        var firestoreData = documents.stream()
            .collect(Collectors.toMap(
                doc -> doc.getLong("user_id").intValue(),
                doc -> doc.getDouble("valeur")
            ));

        for (AchatVenteFond fond : achatVenteFonds) {
            Integer userId = fond.getUserId();
            Double valeur = fond.getFond().doubleValue();

            if (userId == null || valeur == null) continue;

            // Si l'utilisateur existe avec la même valeur, ignorer
            if (firestoreData.containsKey(userId) && firestoreData.get(userId).compareTo(valeur) == 0) {
                continue;
            }

            if (firestoreData.containsKey(userId)) {
                // Mise à jour du document si la valeur a changé
                collection.whereEqualTo("user_id", userId)
                        .get()
                        .get()
                        .getDocuments()
                        .forEach(doc -> {
                            try {
                                doc.getReference().update("valeur", valeur).get();
                                System.out.println("Document pour user_id " + userId + " mis à jour.");
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        });
            } else {
                // Ajouter un nouveau document
                collection.add(new DocumentPortefeuille(userId, valeur)).get();
                System.out.println("Document pour user_id " + userId + " ajouté.");
            }
        
        }
    }

    private void updateDate() {
        LocalDateTime now = ProjectUtils.getTimeNow();
        String sql = "INSERT INTO synchro_date (dt_sync) VALUES (?)";
        jdbcTemplate.update(sql, now);
    }
    

    private LocalDateTime getLastSync() {
        String sql = "SELECT MAX(dt_sync) FROM synchro_date";
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            Timestamp timestamp = rs.getTimestamp(1);
            return timestamp != null ? timestamp.toLocalDateTime() : null;
        });
    }


    private void localToFirestoreCrypto(Firestore db) throws Exception {
        List<Crypto> cryptos = cryptoService.findAll();
    
        // Effacer l'ancienne collection avant l'insertion
        clearCollection("crypto", db);
    
        WriteBatch batch = db.batch();
        int count = 0;
    
        for (Crypto crypto : cryptos) {
            Map<String, Object> cryptoMap = new HashMap<>();
            cryptoMap.put("crypto_id", crypto.getId());
            cryptoMap.put("label", crypto.getLabel());
    
            // Préparer la requête Firestore
            DocumentReference docRef = db.collection("crypto").document(UUID.randomUUID().toString());
            batch.set(docRef, cryptoMap);
    
            count++;
    
            // Commit du batch tous les 100 documents
            if (count == 100) {
                batch.commit().get();  // Exécution du batch
                batch = db.batch();    // Nouveau batch
                count = 0;
            }
        }
    
        // Commit des restants si nécessaire
        if (count > 0) {
            batch.commit().get();
        }
    
        System.out.println("Les données Crypto ont été synchronisées.");
    }
    
    private void localToFirestoretransactionCrypto(LocalDateTime lastSync, Firestore db) throws Exception {
        // à changer aveo
        List<TransactionCrypto> listTransactionCryptos = transactionCryptoService.getAllToSynchro(lastSync);
        
        WriteBatch batch = db.batch();
        int count = 0;

        for (TransactionCrypto transactionCrypto : listTransactionCryptos) {

            Map<String,Object> transactionCryptoMap = new HashMap<>();
            transactionCryptoMap.put("crypto_id", transactionCrypto.getCrypto().getId());
            transactionCryptoMap.put("crypto_nom", transactionCrypto.getCrypto().getLabel());
            transactionCryptoMap.put("dt_transaction", Timestamp.valueOf(transactionCrypto.getDtTransaction()));
            transactionCryptoMap.put("is_achat", false);
            if(transactionCrypto.getCommission().getId() == 2) transactionCryptoMap.put("is_achat", true);
            transactionCryptoMap.put("pu_crypto", transactionCrypto.getPuCrypto());
            transactionCryptoMap.put("qte", transactionCrypto.getQte());
            transactionCryptoMap.put("user_id", transactionCrypto.getUsers().getId());

            // Préparer l'insertion dans le batch
            DocumentReference docRef = db.collection("transaction_crypto").document(UUID.randomUUID().toString());
            batch.set(docRef, transactionCryptoMap);
            count++;

             // Limite de Firestore : 500 opérations par batch
            if (count == 100) {
                batch.commit().get();
                batch = db.batch();  // Créer un nouveau batch
                count = 0;
            }
        }
        if (count > 0) {
            batch.commit().get();
        }
        System.out.println("Les données transaction crypto ont été synchronisées.");
    }


    private void localToFirestorePrixCrypto(Firestore db) throws Exception {
    clearCollection("prix_crypto", db);
    CoursCryptoDTO coursCryptoDTO = cryptoService.getCoursCrypto();

    WriteBatch batch = db.batch();
    int count = 0;

    for (PrixCrypto prixCrypto : coursCryptoDTO.getCryptoPrix()) {
        Map<String, Object> prixCryptoData = new HashMap<>();
        prixCryptoData.put("crypto_id", prixCrypto.getCrypto().getId());
        prixCryptoData.put("crypto_nom", prixCrypto.getCrypto().getLabel());
        prixCryptoData.put("daty", Timestamp.valueOf(prixCrypto.getDaty()));
        prixCryptoData.put("prix", prixCrypto.getPrix());

        // Préparer l'insertion dans le batch
        DocumentReference docRef = db.collection("prix_crypto").document(UUID.randomUUID().toString());
        batch.set(docRef, prixCryptoData);
        count++;

        // Limite de Firestore : 500 opérations par batch
        if (count == 100) {
            batch.commit().get();
            batch = db.batch();  // Créer un nouveau batch
            count = 0;
        }
    }

    // Commit des insertions restantes
    if (count > 0) {
        batch.commit().get();
    }
    System.out.println("Les données prix_crypto ont été synchronisées.");
}


    private void localToFirestoreUsers(LocalDateTime lastSync,Firestore db)throws Exception{
        // users
        List<Users> newUsers = usersService.getUsersAddedAfter(lastSync);
        for (Users users : newUsers) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("id_user", users.getId());
            userData.put("full_name", users.getFullName());
            userData.put("email", users.getEmail());
            userData.put("pdp","https://robohash.org/"+users.getId()+"?set=set1");
            userData.put("pwd", users.getPassword());

            db.collection("users").document(UUID.randomUUID().toString())
              .set(userData)
              .get();  // Envoie les données

            CreateRequest request = new CreateRequest()
                .setEmail(users.getEmail())
                .setPassword(users.getPassword())
                .setDisplayName(users.getFullName())
                .setUid(users.getId().toString()); // Id utilisateur local

          UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
          System.out.println("Utilisateur ajouté à Firebase Auth: " + userRecord.getUid());

        }
    }

    public void clearCollection(String collectionName, Firestore db) {
    try {
        CollectionReference collection = db.collection(collectionName);

        // Obtenir tous les documents
        ApiFuture<QuerySnapshot> future = collection.get();
        QuerySnapshot documents = future.get();

        if (documents.isEmpty()) {
            System.out.println("La collection est déjà vide.");
            return;
        }

        WriteBatch batch = db.batch();
        int count = 0;

        // Ajouter les suppressions au batch
        for (DocumentSnapshot document : documents) {
            batch.delete(document.getReference());
            count++;

            // Limite de Firestore : 500 opérations par batch
            if (count == 100) {
                batch.commit().get();  // Exécute le batch actuel
                batch = db.batch();     // Réinitialise le batch
                count = 0;
            }
        }

        // Commit des suppressions restantes
        if (count > 0) {
            batch.commit().get();
        }

        System.out.println("La collection " + collectionName + " a été vidée.");
    } catch (InterruptedException | ExecutionException e) {
        e.printStackTrace();
    }
}

}
