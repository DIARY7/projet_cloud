package mg.cloud.projets5.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mg.cloud.projets5.dto.transaction.fond.TransactionFondDemandeDTO;
import mg.cloud.projets5.entity.TransactionFondDemande;

public interface TransactionFondDemandeRepo extends JpaRepository<TransactionFondDemande,String> {

    @Query(value = "SELECT nextval('transaction_fond_demande_seq')", nativeQuery = true)
    Long getNextSequenceValue();


    @Query("""
        SELECT 
            new mg.cloud.projets5.dto.transaction.fond.TransactionFondDemandeDTO(
                tfd.id,
                tfd.entree,
                tfd.sortie, 
                tfd.dtTransaction,
                tfd.users.id,
                tfd.users.email,
                tfd.users.fullName
            )
        FROM TransactionFondDemande tfd ORDER BY tfd.dtTransaction DESC
            """)
    List<TransactionFondDemandeDTO> findAllTransaction();
    
}