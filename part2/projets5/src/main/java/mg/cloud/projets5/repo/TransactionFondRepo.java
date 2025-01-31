package mg.cloud.projets5.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.entity.TransactionFond;

public interface TransactionFondRepo extends JpaRepository<TransactionFond,Integer>{
    @Query(value = "SELECT solde_actuel FROM vue_fond_actuel WHERE user_id = :user_id", nativeQuery = true)
    Optional<Double> getFondActuel(@Param("user_id") int user_id);
}
