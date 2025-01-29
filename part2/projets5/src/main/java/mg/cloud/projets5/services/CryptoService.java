package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.repo.CryptoRepo;
import mg.cloud.projets5.entity.Crypto;
import java.util.List;

@Service
public class CryptoService {
    @Autowired
    CryptoRepo cryptoRepo;

    public List<Crypto> findAll(){
        return cryptoRepo.findAll();
    }
}
