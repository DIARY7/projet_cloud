package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.repo.TransactionFondRepo;

@Service
public class FondService {
    
    @Autowired
    TokensService tokenService;

    @Autowired
    TransactionFondRepo transFondRepo;

    public double getMontantTotal(Integer idUser) {
        return transFondRepo.getFondActuel(idUser).orElse(0.0);
    }
}
