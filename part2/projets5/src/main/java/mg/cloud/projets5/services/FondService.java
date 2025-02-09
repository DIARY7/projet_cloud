package mg.cloud.projets5.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.swing.text.StyledEditorKit.BoldAction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.dto.transaction.fond.TransactionFondDemandeDTO;
import mg.cloud.projets5.entity.TransactionCrypto;
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


    public void traiterDemande(String demandeId,Boolean valider){
        if(valider) transactionFondService.create(demandeId);
        deleteFondDemande(demandeId);
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
