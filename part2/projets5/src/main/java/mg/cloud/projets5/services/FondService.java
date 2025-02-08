package mg.cloud.projets5.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.dto.transaction.fond.TransactionFondDemandeDTO;
import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.repo.TransactionFondDemandeRepo;
import mg.cloud.projets5.repo.TransactionFondRepo;

@Service
public class FondService {
    
    @Autowired
    TokensService tokenService;

    @Autowired
    TransactionFondRepo transFondRepo;

    @Autowired
    TransactionFondDemandeRepo transactionFondDemandeRepo;

    

    public Double getMontantTotal(Integer idUser) {
        return transFondRepo.getFondActuel(idUser).orElse(0.0);
    }

    public List<TransactionFondDemande> getAll(){
        return transactionFondDemandeRepo.findAll();
    }

    public List<TransactionFondDemandeDTO> getAlldto(){
        return transactionFondDemandeRepo.findAllTransaction();
    }

    public void deleteFondDemande(String id){
        TransactionFondDemande fondDemande = transactionFondDemandeRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("not found"));
            transactionFondDemandeRepo.delete(fondDemande);
    }   

    public void createDemandeFond(TransactionFondDemande fondDemande){
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
                transaction.setDtTransaction(LocalDateTime.now().minusDays(i));
                transaction.setUsers(user);
                transactions.add(transaction);
            }

            transactionFondDemandeRepo.saveAll(transactions);
        }

        return transactions;
    }
}
