package mg.cloud.projets5.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.dto.AchatVenteFond;
import mg.cloud.projets5.dto.transaction.PorteFeuilleCrypto;
import mg.cloud.projets5.entity.TransactionCrypto;

public interface TransactionCryptoRepo extends JpaRepository<TransactionCrypto,Integer> {

        @Query(value ="""
               SELECT 
    COALESCE(v.prix, 0.00) AS ventePrix,
    COALESCE(v.qte, 0.00) AS venteQte,
    COALESCE(a.prix, 0.00) AS achatPrix,
    COALESCE(a.qte, 0.00) AS achatQte,
    u.full_name AS user,
    u.id AS userId,
    COALESCE(f.fond, 0.00) AS fond
FROM users u
LEFT JOIN (
    SELECT 
        user_id, 
        COALESCE(SUM(prix), 0.00) AS prix, 
        COALESCE(SUM(qte), 0.00) AS qte
    FROM transaction_crypto  
    WHERE type_commission_id = 1 AND dt_transaction <= :endDate 
    GROUP BY user_id
) AS v ON u.id = v.user_id
LEFT JOIN (
    SELECT 
        user_id, 
        COALESCE(SUM(prix), 0.00) AS prix, 
        COALESCE(SUM(qte), 0.00) AS qte
    FROM transaction_crypto  
    WHERE type_commission_id = 2 AND dt_transaction <= :endDate 
    GROUP BY user_id
) AS a ON u.id = a.user_id
LEFT JOIN (
    SELECT 
        user_id,
        COALESCE(SUM(entree - sortie), 0.00) AS fond 
    FROM transaction_fond 
    WHERE dt_transaction <= :endDate 
    GROUP BY user_id
) AS f ON u.id = f.user_id
 ORDER BY u.id asc
       
                        """,nativeQuery = true)
            List<AchatVenteFond> findFilterEtat(
            @Param("endDate") LocalDateTime endDate
            );

    @Query( value = """
            SELECT new mg.cloud.projets5.dto.transaction.PorteFeuilleCrypto(tc.crypto.id,tc.crypto.label, COALESCE(SUM(qte), 0) ) 
            FROM TransactionCrypto tc  WHERE tc.users.id = :idUser
            GROUP BY tc.crypto.id,tc.crypto.label
            """)
    List<PorteFeuilleCrypto> getWalletUser(@Param("idUser") int idUser );

    @Query(value = """
            SELECT new mg.cloud.projets5.dto.transaction.PorteFeuilleCrypto(tc.crypto.id, tc.crypto.label, COALESCE(SUM(tc.qte), 0))
            FROM TransactionCrypto tc
            WHERE tc.users.id = :idUser
            AND tc.crypto.id = :cryptoId
            GROUP BY tc.crypto.id, tc.crypto.label
            """)
    PorteFeuilleCrypto getQteCryptoUser(@Param("idUser") int idUser, @Param("cryptoId") int cryptoId);

    // @Query(value = """
    //         SELECT new mg.cloud.projets5.dto.transaction.PorteFeuilleCrypto(tc.crypto, SUM(qte))
    //         FROM TransactionCrypto tc  WHERE tc.users.id = :idUser
    //         GROUP BY tc.crypto
    //         """)
    // List<PorteFeuilleCrypto> getWalletUser2(@Param("idUser") int idUser);
}
