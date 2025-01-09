package mg.cloud.projets5.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import mg.cloud.projets5.entity.Cryptos;

public interface CryptoRepo extends JpaRepository<Cryptos, Long> {
    

}
