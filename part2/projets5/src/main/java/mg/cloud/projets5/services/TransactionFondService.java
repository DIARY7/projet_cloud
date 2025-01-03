package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.repo.TransactionFondRepo;

@Service
public class TransactionFondService {
    
    @Autowired
    TransactionFondRepo transactionFondRepo;


    public void ajouterFond(String token){
        /*
         * - Verifier le token si il est valide
         */
        ajouterFond();
    }

    

    public void retirerFond(String token){
        /*
         * - Verifier le token si il est valide
        */
        retirerFond();
    }

    public void ajouterFond(){
        /*
         * - Teste d'integrité
         *      - Verifier si le montant à inserer est positif
         * - ajouter le fond
         */
    }

    public void retirerFond(){
        /*
         * - Teste d'integrité
         *      - Verifier si le montant est positif
         *      - Verifier si le montant est inferieur au montant du compte
         * - ajouter la transcation
         */
    }


    
}
