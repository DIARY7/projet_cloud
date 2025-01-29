package mg.cloud.projets5.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.repo.TransactionCryptoRepo;
import mg.cloud.projets5.entity.TransactionCrypto;

@Service
public class TransactionCryptoService {
    @Autowired
    TransactionCryptoRepo transactionCryptoRepo;

    public List<TransactionCrypto> filterByCommissionIdAndDateAndCryptoId(String cryptoId,String userId,LocalDate date_debut,LocalDate date_fin){
        return transactionCryptoRepo.findFilteredTransactions(cryptoId,userId,date_debut,date_fin);
    }
}
