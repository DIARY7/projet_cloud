package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.repo.TransactionFondDemandeRepo;

@Service
public class TransactionFondDemandeService {
    
    @Autowired
    TransactionFondDemandeRepo transactionFondDemandeRepo;

    public void create(TransactionFondDemande transactionFondDemande){
        transactionFondDemandeRepo.save(transactionFondDemande);
    }
    
}
