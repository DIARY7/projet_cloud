package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.entity.TypeCommission;
import mg.cloud.projets5.repo.TypeCommissionRepo;

@Service
public class TypeCommissionService {
    @Autowired
    TypeCommissionRepo typeCommissionRepo;

    public void update(Integer typeCommissionId,Double pourcentage){
        pourcentage = pourcentage/100;    
        TypeCommission tpc = typeCommissionRepo.findById(typeCommissionId)
                .orElseThrow(() -> new RuntimeException("Type Commission non trouvé"));

        tpc.setCommission(pourcentage);

        typeCommissionRepo.save(tpc);
    }
}
