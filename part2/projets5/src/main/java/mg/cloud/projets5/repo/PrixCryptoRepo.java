package mg.cloud.projets5.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import mg.cloud.projets5.entity.PrixCrypto;

public interface PrixCryptoRepo extends JpaRepository<PrixCrypto, Integer> {
    
}
