package mg.cloud.projets5.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.repo.TransactionCryptoRepo;
import mg.cloud.projets5.utils.ConversionCrypto;
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
            Double fond = quantite * prix;
            /*
             * Verifier fond
             */
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
            transactionFondService.retirerFond(dateTransaction,fond,user_id,devise_id);                       
        }else{
            throw new IllegalArgumentException("Quantite positive uniquement");
        }

        
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
            Double cryptoToFond = ConversionCrypto.CryptoToFond(quantite, prix);
            TransactionCrypto tc = TransactionCrypto.builder()
                                    .dateTransaction(dateTransaction)
                                    .user(Users.builder().id(user_id).build())
                                    .devise(Devises.builder().id(devise_id).build())
                                    .crypto(Cryptos.builder().id(crypto_id).build())
                                    .entree(0.0)
                                    .sortie(quantite)
                                    .montant(cryptoToFond)
                                    .build();
            transactionCryptoRepo.save(tc);
            /*
             * Transformer le crypto en Fond
            */
            transactionFondService.ajouterFond(token, dateTransaction, cryptoToFond, user_id, devise_id);

        }else{
            throw new IllegalArgumentException("Quantite positive uniquement");
        }
       
    }


    
    
}
