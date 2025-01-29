package mg.cloud.projets5.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.entity.TransactionCrypto;

public interface TransactionCryptoRepo extends JpaRepository<TransactionCrypto,Integer> {

        @Query("SELECT t FROM TransactionCrypto t WHERE " +
        "(:cryptoId IS NULL OR t.crypto.id = :cryptoId ) AND " +
        "(:userId IS NULL OR t.users.id = :userId ) AND " +
        "(:startDate IS NULL OR t.dtTransaction >= :startDate) AND " +
        "(:endDate IS NULL OR t.dtTransaction <= :endDate)")
            List<TransactionCrypto> findFilteredTransactions(
            @Param("cryptoId") Integer cryptoId,
            @Param("userId") Integer userId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
            );


}
