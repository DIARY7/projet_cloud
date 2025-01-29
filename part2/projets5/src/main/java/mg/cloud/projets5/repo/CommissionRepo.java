package mg.cloud.projets5.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import mg.cloud.projets5.entity.Commission;

public interface CommissionRepo extends JpaRepository<Commission,Integer>{
    
}
