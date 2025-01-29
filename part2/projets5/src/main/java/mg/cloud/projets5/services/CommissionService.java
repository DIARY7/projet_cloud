package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.entity.Commission;
import mg.cloud.projets5.repo.CommissionRepo;

@Service
public class CommissionService {
    @Autowired
    CommissionRepo commissionRepo;

    public void save(Commission commission){
        commissionRepo.save(commission);
    }
}
