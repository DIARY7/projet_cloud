package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.repo.TransactionFondRepo;
import java.time.LocalDateTime;
import mg.cloud.projets5.entity.*;

@Service
public class TransactionFondService {
    
    @Autowired
    private TransactionFondRepo transactionFondRepo;


    public void ajouterFond(String token,LocalDateTime dateTransaction ,Double entree,Long user_id,Long devise_id){
        /*
         * - Verifier le token si il est valide
         */
        ajouterFond(dateTransaction ,entree,user_id,devise_id);
    }

    

    public void retirerFond(String token,LocalDateTime dateTransaction ,Double sortie,Long user_id,Long devise_id){
        /*
         * - Verifier le token si il est valide
        */
        retirerFond(dateTransaction ,sortie,user_id,devise_id);
    }

    public void ajouterFond(LocalDateTime dateTransaction ,Double entree,Long user_id,Long devise_id){
        /*
         * - Teste d'integrité
         *      - Verifier si le montant à inserer est positif
         * - ajouter le fond
         */
        if (entree > 0) {
            TransactionFond tf = TransactionFond.builder()
                                    .dateTransaction(dateTransaction)
                                    .user(Users.builder().id(user_id).build())
                                    .devise(Devises.builder().id(devise_id).build())
                                    .entree(entree)
                                    .sortie(0.0)
                                    .build();
            transactionFondRepo.save(tf);                            
        }else{
            throw new IllegalArgumentException("Somme positive uniquement");
        }
    }

    public void retirerFond(LocalDateTime dateTransaction ,Double sortie,Long user_id,Long devise_id){
        /*
         * - Teste d'integrité
         *      - Verifier si le montant est positif
         *      - Verifier si le montant est inferieur au montant du compte
         * - ajouter la transcation
         */
        if (sortie > 0) {
            TransactionFond tf = TransactionFond.builder()
                                    .dateTransaction(dateTransaction)
                                    .user(Users.builder().id(user_id).build())
                                    .devise(Devises.builder().id(devise_id).build())
                                    .entree(0.0)
                                    .sortie(sortie)
                                    .build();
            transactionFondRepo.save(tf);                            
        }else{
            throw new IllegalArgumentException("Somme positive uniquement");
        }
    }


    
}
