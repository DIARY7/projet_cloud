package mg.cloud.projets5.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.repo.TransactionCryptoRepo;
import mg.cloud.projets5.entity.TransactionCrypto;

@Service
public class TransactionCryptoService {
    @Autowired
    TransactionCryptoRepo transactionCryptoRepo;

    public List<TransactionCrypto> filterByCommissionIdAndDateAndCryptoId(Integer cryptoId,Integer userId,LocalDate date_debut,LocalDate date_fin){
        LocalDateTime dateDebutTime = (date_debut != null) ? date_debut.atStartOfDay() : null;
        LocalDateTime dateFinTime = (date_fin != null) ? date_fin.atTime(23, 59, 59) : null;
        return transactionCryptoRepo.findFilteredTransactions(cryptoId,userId,dateDebutTime,dateFinTime);
    }
}
