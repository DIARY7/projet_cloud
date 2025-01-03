package mg.cloud.projets5.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import mg.cloud.projets5.entity.TransactionFond;

public interface TransactionFondRepo extends JpaRepository<TransactionFond, Long> {
    
}
