package mg.cloud.projets5.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.dto.evolutionCrypto.EvolutionCryptoDTO;
import mg.cloud.projets5.dto.evolutionCrypto.ListCryptoPrix;
import mg.cloud.projets5.dto.evolutionCrypto.PrixDate;
import mg.cloud.projets5.entity.Crypto;
import mg.cloud.projets5.entity.PrixCrypto;
import mg.cloud.projets5.repo.CryptoRepo;
import mg.cloud.projets5.repo.PrixCryptoRepo;

@Service
public class CryptoService {

    @Autowired
    CryptoRepo cryptoRepo;

    @Autowired
    PrixCryptoRepo prixCryptoRepo;


    public EvolutionCryptoDTO getEvolutionCrypto(){
        List<PrixCrypto> prixCryptos = prixCryptoRepo.findAll();
        EvolutionCryptoDTO evolutionCryptoDTO = new EvolutionCryptoDTO();
        



        return evolutionCryptoDTO

    }


    
}
