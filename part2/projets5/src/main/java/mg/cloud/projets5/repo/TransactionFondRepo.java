package mg.cloud.projets5.repo;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.dto.UserFond;
import mg.cloud.projets5.entity.TransactionFond;

public interface TransactionFondRepo extends JpaRepository<TransactionFond, Long> {

     @Query("SELECT new mg.cloud.projets5.dto.UserFond(SUM(tf.entree), SUM(tf.sortie),(SUM(tf.entree) - SUM(tf.sortie)),tf.user) " +
       "FROM TransactionFond tf " +
       "WHERE tf.dateTransaction <= : date " +
       "AND tf.user.id = : userId")
    UserFond FindUserFond(@Param("date") LocalDateTime date,@Param("userId") Long userId);
}
