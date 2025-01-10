package mg.cloud.projets5.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.entity.TransactionCrypto;

public interface TransactionCryptoRepo extends JpaRepository<TransactionCrypto, Long> {
    
    @Query( value = "SELECT * from transaction_crypto tr where tr.sortie = 0 ",nativeQuery = true)
    List<TransactionCrypto> findListeAchat();
    
    @Query(value = "SELECT * from transaction_crypto tr where tr.entree = 0",nativeQuery = true)
    List<TransactionCrypto> findListeVente();

     @Query("SELECT SUM(tc.entre) - SUM(tc.sortie)  FROM TransactionCrypto tc WHERE tc.user.id = : userId")
    Double findPorteFeuilleCrypto(@Param("userId") Long userId);
}