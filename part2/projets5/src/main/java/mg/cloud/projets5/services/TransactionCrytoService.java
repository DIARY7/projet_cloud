package mg.cloud.projets5.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.repo.TransactionCryptoRepo;
import mg.cloud.projets5.entity.Cryptos;
import mg.cloud.projets5.entity.Devises;
import mg.cloud.projets5.entity.TransactionCrypto;
import mg.cloud.projets5.entity.Users;

@Service
public class TransactionCrytoService {
    
    @Autowired
    TransactionCryptoRepo transactionCryptoRepo;

    @Autowired
    TransactionFondService transactionFondService;

    public void ajouterCrypto(String token,LocalDateTime dateTransaction ,Double quantite,Double prix,Long crypto_id,Long user_id,Long devise_id){
        /*
         * - Verifier le token si il est valide
         * - Convertir le Fond en Crypto
         * - Ajouter la transcation du crypto dans la table transactionCrypto
         * - Ajouter la transcation du fond dans la table transactionFond
         */
        if (quantite > 0) {
            TransactionCrypto tc = TransactionCrypto.builder()
                                    .dateTransaction(dateTransaction)
                                    .user(Users.builder().id(user_id).build())
                                    .devise(Devises.builder().id(devise_id).build())
                                    .crypto(Cryptos.builder().id(crypto_id).build())
                                    .entree(quantite)
                                    .sortie(0.0)
                                    .montant(prix)
                                    .build();
                                    transactionCryptoRepo.save(tc);                            
        }else{
            throw new IllegalArgumentException("Quantite positive uniquement");
        }

        transactionFondService.retirerFond(dateTransaction,quantite*prix,user_id,devise_id);
    }
    
    public void retirerCrypto(String token,LocalDateTime dateTransaction ,Double quantite,Double prix,Long crypto_id,Long user_id,Long devise_id){
        /*
         * - Verifier le token si il est valide
         * - Convertir le Crypto en Fond
         * - Ajouter la transcation du crypto dans la table transactionCrypto
         * - Ajouter la transcation du fond dans la table transactionFond
         * - retirer le crypto
         */
        if (quantite > 0) {
            TransactionCrypto tc = TransactionCrypto.builder()
                                    .dateTransaction(dateTransaction)
                                    .user(Users.builder().id(user_id).build())
                                    .devise(Devises.builder().id(devise_id).build())
                                    .crypto(Cryptos.builder().id(crypto_id).build())
                                    .entree(0.0)
                                    .sortie(quantite)
                                    .montant(prix)
                                    .build();
            transactionCryptoRepo.save(tc);                            
        }else{
            throw new IllegalArgumentException("Quantite positive uniquement");
        }
        transactionFondService.ajouterFond(dateTransaction,quantite*prix,user_id,devise_id);
    }


    
    
}
