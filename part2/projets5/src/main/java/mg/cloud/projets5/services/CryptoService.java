package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.repo.CryptoRepo;

@Service
public class CryptoService {
    @Autowired
    CryptoRepo cryptoRepo;
}
