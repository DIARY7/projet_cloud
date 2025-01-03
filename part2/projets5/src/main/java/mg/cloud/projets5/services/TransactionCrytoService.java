package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.repo.TransactionCryptoRepo;

@Service
public class TransactionCrytoService {
    
    @Autowired
    TransactionCryptoRepo transactionCryptoRepo;

    @Autowired
    TransactionFondService transactionFondService;

    public void ajouterCrypto(String token){
        /*
         * - Verifier le token si il est valide
         * - Convertir le Fond en Crypto
         * - Ajouter la transcation du crypto dans la table transactionCrypto
         * - Ajouter la transcation du fond dans la table transactionFond
         */

        transactionFondService.retirerFond();
    }
    
    public void retirerCrypto(String token){
        /*
         * - Verifier le token si il est valide
         * - Convertir le Crypto en Fond
         * - Ajouter la transcation du crypto dans la table transactionCrypto
         * - Ajouter la transcation du fond dans la table transactionFond
         * - retirer le crypto
         */
        transactionFondService.ajouterFond();
    }


    
    
}
