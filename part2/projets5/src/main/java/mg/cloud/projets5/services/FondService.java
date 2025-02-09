package mg.cloud.projets5.services;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

import mg.cloud.projets5.dto.transaction.fond.TransactionFondDemandeDTO;
import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.repo.TransactionFondDemandeRepo;
import mg.cloud.projets5.repo.TransactionFondRepo;
import mg.cloud.projets5.utils.ProjectUtils;

@Service
public class FondService {
    
    @Autowired
    TokensService tokenService;

    @Autowired
    TransactionFondRepo transFondRepo;

    @Autowired
    TransactionFondDemandeRepo transactionFondDemandeRepo;

    @Autowired
    TransactionFondService transactionFondService;

    @Autowired
    NotificationService notificationService;

    
    public Double getMontantTotal(Integer idUser) {
        return transFondRepo.getFondActuel(idUser).orElse(0.0);
    }


    public void createDemandeFond(TransactionFondDemande fondDemande){
        if(fondDemande.getSortie() < 0 || fondDemande.getEntree() < 0) throw new RuntimeException("Montant invalide , veuillez reverfier");

        if(fondDemande.getSortie() > 0){
            
            Double fondActuel = getMontantTotal(fondDemande.getUsers().getId());
            System.out.println(fondDemande.getSortie() +" > "+ fondActuel);
            if(fondDemande.getSortie() > fondActuel){
                throw new RuntimeException("Solde Insuffisant pour un retrait");
            } 
        }
        transactionFondDemandeRepo.save(fondDemande);
    }

    public List<TransactionFondDemande> generateTest() {
        List<TransactionFondDemande> transactions = new ArrayList<>();

        // Assuming you have some users in your database
        Users user =  new Users();
        user.setId(1);

        if (user != null) {
            for (int i = 0; i < 10; i++) {
                TransactionFondDemande transaction = new TransactionFondDemande();
                transaction.setEntree(Math.random() * 1000);
                transaction.setSortie(Math.random() * 500);
                transaction.setDtTransaction(ProjectUtils.getTimeNow().minusDays(i));
                transaction.setUsers(user);
                transactions.add(transaction);
            }

            transactionFondDemandeRepo.saveAll(transactions);
        }

        return transactions;
    }


    public void traiterDemande(String demandeId,Boolean valider) throws InterruptedException, ExecutionException{
        TransactionFondDemande fondDemande = transactionFondDemandeRepo.findById(demandeId)
            .orElseThrow(() -> new RuntimeException("not found"));
        Integer users_id = fondDemande.getUsers().getId();

        if(valider) transactionFondService.create(demandeId);
        deleteFondDemande(demandeId);
        Firestore db = FirestoreClient.getFirestore();

        Query query = db.collection("FCM_Token")
                .whereEqualTo("user_id", users_id.toString());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
        QueryDocumentSnapshot documentSnapshot = documents.isEmpty() ? null : documents.get(0);
        System.out.println(documents.isEmpty());
        if (documentSnapshot != null) {
            String fcmToken = documentSnapshot.getString("token");
            System.out.println(fcmToken);
            if(valider){
                notificationService.envoyerNotification(fcmToken, "Demande de transaction de fond", "Votre demande a été valider");
            }
            else{
                notificationService.envoyerNotification(fcmToken, "Demande de transaction de fond", "Votre demande a été refuser");
            }
        }
    }

    public List<TransactionFondDemandeDTO> getAlldto(){
        return transactionFondDemandeRepo.findAllTransaction();
    }

    public void deleteFondDemande(String id){
        TransactionFondDemande fondDemande = transactionFondDemandeRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("not found"));
            transactionFondDemandeRepo.delete(fondDemande);
    }   


    public TransactionFondDemande getDemandeFondById(String id){
        return transactionFondDemandeRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("No found"));
    }
    
}
