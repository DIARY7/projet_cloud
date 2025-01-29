package mg.cloud.projets5.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.dto.analyseCrypto.AnalyseCrypto;
import mg.cloud.projets5.entity.PrixCrypto;

public interface PrixCryptoRepo extends JpaRepository<PrixCrypto, Integer> {


    @Query("SELECT pc FROM PrixCrypto pc ORDER BY pc.daty ASC")
    List<PrixCrypto> findAll();

    @Query("SELECT pc FROM PrixCrypto pc WHERE pc.daty = (SELECT MAX(subPc.daty) FROM PrixCrypto subPc WHERE subPc.crypto.id = pc.crypto.id)")
    List<PrixCrypto> findLastPrice();

    @Query(value = """
        SELECT new mg.cloud.projets5.dto.analyseCrypto.AnalyseCrypto(
            c,
            MIN(p.prix),
            MAX(p.prix),
            AVG(p.prix),
            PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY p.prix),
            STDDEV_POP(p.prix)
        ) 
        FROM PrixCrypto p JOIN p.crypto c
        WHERE (:startDate IS NULL OR p.daty >= :startDate)
        AND (:endDate IS NULL OR p.daty <= :endDate)
        GROUP BY c
    """)
    List<AnalyseCrypto> findAnalyseCryptos(@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);
 
    
}
