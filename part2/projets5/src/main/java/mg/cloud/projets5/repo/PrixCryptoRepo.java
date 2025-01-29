package mg.cloud.projets5.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mg.cloud.projets5.entity.PrixCrypto;

public interface PrixCryptoRepo extends JpaRepository<PrixCrypto, Integer> {


    @Query("SELECT pc FROM PrixCrypto pc ORDER BY pc.daty ASC")
    List<PrixCrypto> findAll();

    @Query("SELECT pc FROM PrixCrypto pc WHERE pc.daty = (SELECT MAX(subPc.daty) FROM PrixCrypto subPc WHERE subPc.crypto.id = pc.crypto.id)")
    List<PrixCrypto> findLastPrice();
    
}
