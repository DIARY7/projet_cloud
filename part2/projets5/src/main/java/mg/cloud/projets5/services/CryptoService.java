package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.entity.Cryptos;
import mg.cloud.projets5.repo.CryptoRepo;

import java.util.List;
import java.util.Random;

@Service
public class CryptoService {
    
    @Autowired
    CryptoRepo cryptoRepo;

    public static double generateRandomPrice(double currentPrice) {
        Random random = new Random();
        // Génère une fluctuation aléatoire entre minChange et maxChange
        double percentageChange = -10 + (7 - (-10)) * random.nextDouble();
        // Applique la fluctuation au prix actuel
        return currentPrice * (1 + percentageChange / 100);
    }

    public List<Cryptos> findAll(){
        return cryptoRepo.findAll();
    }

}
