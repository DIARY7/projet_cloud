package mg.cloud.projets5.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.entity.TransactionCrypto;

public interface TransactionCryptoRepo extends JpaRepository<TransactionCrypto,Integer> {
    @Query("SELECT t FROM TransactionCrypto t WHERE " +
    "(:cryptoId IS NULL OR :cryptoId = '' OR t.crypto.id LIKE %:cryptoId%) AND " +
    "(:userId IS NULL OR :userId = '' OR t.users.id LIKE %:userId%) AND " +
    "(:startDate IS NULL OR t.dtTransaction >= :startDate) AND " +
    "(:endDate IS NULL OR t.dtTransaction <= :endDate) ")
public List<TransactionCrypto> findFilteredTransactions(
 @Param("cryptoId") String cryptoId,
 @Param("userId") String userId,
 @Param("startDate") LocalDate startDate,
 @Param("endDate") LocalDate endDate
);

}
