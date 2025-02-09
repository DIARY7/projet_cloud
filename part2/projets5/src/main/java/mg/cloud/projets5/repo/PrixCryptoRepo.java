package mg.cloud.projets5.repo;

// import java.lang.classfile.ClassFile.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.dto.analyseCrypto.AnalyseCrypto;
import mg.cloud.projets5.entity.PrixCrypto;

public interface PrixCryptoRepo extends JpaRepository<PrixCrypto, Integer> {

    @Query("SELECT pc FROM PrixCrypto pc ORDER BY pc.daty ASC")
    List<PrixCrypto> findAll();

    @Query("SELECT pc FROM PrixCrypto pc WHERE pc.daty >= :date ORDER BY pc.daty ASC")
    List<PrixCrypto> findLastHourPrices(@Param("date") LocalDateTime date);

    

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
        WHERE (p.daty >= :startDate)
        AND (p.daty <= :endDate)
        GROUP BY c
    """)
    List<AnalyseCrypto> findAnalyseCryptos(@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);

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
        GROUP BY c
    """)
    List<AnalyseCrypto> findAnalyseCryptos();

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
         WHERE (p.daty >= :startDate)
        GROUP BY c
    """)
    List<AnalyseCrypto> findAnalyseCryptosWithMinDate(@Param("startDate") LocalDateTime startDate);

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
         WHERE (p.daty <= :endDate)
        GROUP BY c
    """)
    List<AnalyseCrypto> findAnalyseCryptosWithMaxDate(@Param("endDate") LocalDateTime endDate); 
    
    @Query("SELECT pc.prix FROM PrixCrypto pc WHERE pc.crypto.id = :cryptoId AND pc.daty = (SELECT MAX(subPc.daty) FROM PrixCrypto subPc WHERE subPc.crypto.id = :cryptoId)")
    Optional<Double> findLatestPriceByCryptoId(@Param("cryptoId") Integer cryptoId);
}
