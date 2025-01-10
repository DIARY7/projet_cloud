package mg.cloud.projets5.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.entity.Users;

public interface UsersRepo extends JpaRepository<Users, Long> {

    @Query("SELECT SUM(tf.entree) - SUM(tf.sortie) FROM TransactionFond tf WHERE tf.user.id = :userId")
    Double findCurrentFundByUserId(@Param("userId") Long userId);
    
}