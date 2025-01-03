package mg.cloud.projets5.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import mg.cloud.projets5.entity.TransactionCrypto;

public interface TransactionCryptoRepo extends JpaRepository<TransactionCrypto, Long> {

    
}