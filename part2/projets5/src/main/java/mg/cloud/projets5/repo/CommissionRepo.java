package mg.cloud.projets5.repo;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.dto.commissionCrypto.CommissionCrypto;
import mg.cloud.projets5.entity.Commission;

public interface CommissionRepo extends JpaRepository<Commission, Integer>{
   @Query(value = """
        SELECT new mg.cloud.projets5.dto.commissionCrypto.CommissionCrypto(
            cm.transactionCrypto.crypto,
            AVG(cm.commission),
            SUM(cm.commission)
        ) 
        FROM Commission cm 
        GROUP BY cm.transactionCrypto.crypto
    """)
    List<CommissionCrypto> findCommissionCryptos();

    @Query(value = """
        SELECT new mg.cloud.projets5.dto.commissionCrypto.CommissionCrypto(
            cm.transactionCrypto.crypto,
            AVG(cm.commission),
            SUM(cm.commission)
        ) 
        FROM Commission cm 
        Where (cm.transactionCrypto.dtTransaction >= :startDate)
        And (cm.transactionCrypto.dtTransaction <= :endDate)
        GROUP BY cm.transactionCrypto.crypto
    """)
    List<CommissionCrypto> findCommissionCryptos(@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);

    @Query(value = """
        SELECT new mg.cloud.projets5.dto.commissionCrypto.CommissionCrypto(
            cm.transactionCrypto.crypto,
            AVG(cm.commission),
            SUM(cm.commission)
        ) 
        FROM Commission cm 
        Where (cm.transactionCrypto.dtTransaction >= :startDate)
        GROUP BY cm.transactionCrypto.crypto
    """)
    List<CommissionCrypto> findCommissionCryptosWithMinDate(@Param("startDate") LocalDateTime startDate);

    @Query(value = """
        SELECT new mg.cloud.projets5.dto.commissionCrypto.CommissionCrypto(
            cm.transactionCrypto.crypto,
            AVG(cm.commission),
            SUM(cm.commission)
        ) 
        FROM Commission cm 
        Where (cm.transactionCrypto.dtTransaction <= :endDate)
        GROUP BY cm.transactionCrypto.crypto
    """)
    List<CommissionCrypto> findCommissionCryptosWithMaxDate(@Param("endDate") LocalDateTime endDate);


}
