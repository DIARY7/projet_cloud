package mg.cloud.projets5.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import mg.cloud.projets5.entity.Users;

public interface UsersRepo extends JpaRepository<Users, Long> {

    
}