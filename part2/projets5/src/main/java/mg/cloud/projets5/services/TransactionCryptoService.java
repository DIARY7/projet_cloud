package mg.cloud.projets5.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

import mg.cloud.projets5.repo.TransactionCryptoRepo;
import mg.cloud.projets5.utils.ProjectUtils;
import mg.cloud.projets5.dto.AchatVenteFond;
import mg.cloud.projets5.entity.TypeCommission;
import mg.cloud.projets5.entity.Crypto;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.dto.transaction.PorteFeuilleCrypto;
import mg.cloud.projets5.entity.TransactionCrypto;
import mg.cloud.projets5.entity.TransactionFond;

@Service
public class TransactionCryptoService {
    @Autowired
    TransactionCryptoRepo transactionCryptoRepo;
    
    @Autowired
    FondService fondService;
    
    @Autowired
    TransactionFondService transactionFondService;

    @Autowired
    CryptoService cryptoService;

    @Autowired
    NotificationService notificationService;

    public List<TransactionCrypto> getAllToSynchro(LocalDateTime synchDateTime){
        return transactionCryptoRepo.findTransactionAfterDtTransaction(synchDateTime);
    }

    public List<TransactionCrypto> filterByUserIdAndDateAndCryptoId(Integer cryptoId,Integer userId,LocalDate date_debut,LocalDate date_fin){
        LocalDateTime dateDebutTime = (date_debut != null) ? date_debut.atStartOfDay() : null;
        LocalDateTime dateFinTime = (date_fin != null) ? date_fin.atTime(23, 59, 59) : null;
        
        List<TransactionCrypto> listCrypt = transactionCryptoRepo.findAll();
        return listCrypt.stream()
         .filter(t -> (cryptoId == null || t.getCrypto().getId().equals(cryptoId)))
         .filter(t -> (userId == null || t.getUsers().getId().equals(userId)))
        .filter(t -> (dateDebutTime == null || !t.getDtTransaction().isBefore(dateDebutTime)))
        .filter(t -> (dateFinTime == null || !t.getDtTransaction().isAfter(dateFinTime)))
        .collect(Collectors.toList());
    }

    public List<AchatVenteFond> filterAchatVenteFond(LocalDate date_fin){
        LocalDateTime dateFinTime = null;
        if (date_fin == null) {
            dateFinTime = ProjectUtils.getTimeNow();
        }else{
            dateFinTime = date_fin.atTime(23, 59, 59);
        }
        return transactionCryptoRepo.findFilterEtat(dateFinTime);
        
    }

    public void save(Double puCrypto,Double qte,Integer typeCommission , Integer cryptoId, Integer userId) throws Exception{
        // LocalDateTime date = dt.atTime(23, 59, 59);
        LocalDateTime date = ProjectUtils.getTimeNow();
        if (qte > 0) {
            if (fondService.getMontantTotal(userId) < puCrypto*qte  && typeCommission == 2){
                 throw new Exception("Fond insuffisant");
            }   
                if (typeCommission == 1) {
                    PorteFeuilleCrypto porteFeuilleCrypto = transactionCryptoRepo.getQteCryptoUser(userId, cryptoId);
                    if (qte>porteFeuilleCrypto.getQte()) {
                        throw new Exception("Vous n'avez pas assez de "+porteFeuilleCrypto.getNomCrypto()+" pour cette transaction");
                    }
                    qte = qte * -1;
                }
                
                double montantTotal = puCrypto*Math.abs(qte);
                TransactionCrypto t = TransactionCrypto.builder()
                .puCrypto(puCrypto)
                .prix(montantTotal)
                .qte(qte)
                .dtTransaction(date)
                .commission(TypeCommission.builder().id(typeCommission).build())
                .crypto(Crypto.builder().id(cryptoId).build())
                .users(Users.builder().id(userId).build())
                .build();
                transactionCryptoRepo.save(t);

                TransactionFond tr = TransactionFond.builder()
                                    .entree(0.0)
                                    .sortie(0.0)
                                    .dtTransaction(date)
                                    .users(Users.builder().id(userId).build())
                                    .build();

                if (typeCommission == 2) {
                    tr.setSortie(montantTotal);
                }else{
                    tr.setEntree(montantTotal);
                }
                
                transactionFondService.create(tr);
                Firestore db = FirestoreClient.getFirestore();
                try {
                    // Vérification si une crypto est favorite pour un utilisateur donné
                    Query query = db.collection("crypto_favorie")
                                    .whereEqualTo("user_id", userId)
                                    .whereEqualTo("crypto_id", cryptoId);
                
                    ApiFuture<QuerySnapshot> querySnapshot = query.get();
                    List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
                
                    if (!documents.isEmpty()) {
                        // La crypto est favorite, récupérer le token FCM
                        Query tokenQuery = db.collection("FCM_Token")
                                              .whereEqualTo("user_id", userId);
                
                        ApiFuture<QuerySnapshot> tokenSnapshot = tokenQuery.get();
                        List<QueryDocumentSnapshot> tokenDocuments = tokenSnapshot.get().getDocuments();
                
                        if (!tokenDocuments.isEmpty()) {
                            String fcmToken = tokenDocuments.get(0).getString("token");
                            if (fcmToken != null) {
                                // Envoyer la notification
                                notificationService.envoyerNotification(fcmToken, 
                                    "Transaction Crypto Favorie", 
                                    "Merci beaucoup, cette transaction concerne votre crypto favorite !");
                                System.out.println("Notification envoyée avec succès !");
                            }
                        }
                    } else {
                        System.out.println("La crypto n'est pas favorite pour cet utilisateur.");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
          
        }else{
            throw new IllegalArgumentException("Quantite positive uniquement");
        }
    }

    public  List<PorteFeuilleCrypto> getWalletCrypto(int idUser){
        List<PorteFeuilleCrypto> listePorteFeuilles = transactionCryptoRepo.getWallet();
        for (int i = 0; i < listePorteFeuilles.size(); i++) {
            PorteFeuilleCrypto porteFeuilleCrypto = transactionCryptoRepo.getQteCryptoUser(idUser, listePorteFeuilles.get(i).getIdCrypto());
            listePorteFeuilles.get(i).setQte(porteFeuilleCrypto.getQte());
            double valeur = listePorteFeuilles.get(i).getQte() * cryptoService.getCryptoCurrentPrice(listePorteFeuilles.get(i).getIdCrypto()); 
            listePorteFeuilles.get(i).setValeur(valeur);
        }     
        // return listePorteFeuilles;
        return listePorteFeuilles.stream()
                .sorted((p1, p2) -> Double.compare(p2.getQte(), p1.getQte()))
                .collect(Collectors.toList());
    }
}


