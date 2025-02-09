package mg.cloud.projets5.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mg.cloud.projets5.entity.Users;

public interface UsersRepo extends JpaRepository<Users,Integer> {
    
    @Query("SELECT u FROM Users u WHERE u.createdAt > :date")
    List<Users> findUsersAddedAfter(@Param("date") LocalDateTime date);
}
