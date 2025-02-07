package mg.cloud.projets5.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import mg.cloud.projets5.entity.TransactionFond;
import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.repo.TransactionFondDemandeRepo;
import mg.cloud.projets5.repo.TransactionFondRepo;

public class TransactionFondService {
    
    @Autowired
    TransactionFondRepo transactionFondRepo;

    @Autowired
    TransactionFondDemandeRepo transactionFondDemandeRepo;


    public void create(String demandeId){

        TransactionFondDemande demande = transactionFondDemandeRepo.findById(demandeId)
            .orElseThrow(() -> new RuntimeException("Not found"));

        TransactionFond transactionFond = new TransactionFond();
        transactionFond.setEntree(demande.getEntree());
        transactionFond.setSortie(demande.getSortie());
        transactionFond.setDtTransaction(demande.getDtTransaction());
        transactionFond.setUsers(demande.getUsers());
        create(transactionFond);
    }

    public void create(TransactionFond transaction){
        transactionFondRepo.save(transaction);
    }
}
