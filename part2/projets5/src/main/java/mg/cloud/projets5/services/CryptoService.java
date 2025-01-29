package mg.cloud.projets5.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.dto.coursCrypto.CoursCryptoDTO;
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


    public CoursCryptoDTO getCoursCrypto(){
        List<PrixCrypto> prixCryptos = prixCryptoRepo.findLastPrice();
        CoursCryptoDTO coursCryptoDTO = new CoursCryptoDTO();
        coursCryptoDTO.setCryptoPrix(prixCryptos);
        return coursCryptoDTO;
    }

    public EvolutionCryptoDTO getEvolutionCrypto() {
        List<PrixCrypto> prixCryptos = prixCryptoRepo.findAll();
        Map<Crypto, List<PrixDate>> cryptoPrixMap = new HashMap<>();

        for (PrixCrypto prixCrypto : prixCryptos) {
            Crypto crypto = prixCrypto.getCrypto();
            PrixDate prixDate = new PrixDate();
            prixDate.setPrix(prixCrypto.getPrix());
            prixDate.setDate(prixCrypto.getDaty());

            cryptoPrixMap.computeIfAbsent(crypto, k -> new ArrayList<>()).add(prixDate);
        }

        List<ListCryptoPrix> listCryptoPrix = new ArrayList<>();
        for (Map.Entry<Crypto, List<PrixDate>> entry : cryptoPrixMap.entrySet()) {
            ListCryptoPrix listCryptoPrixItem = new ListCryptoPrix();
            listCryptoPrixItem.setCrypto(entry.getKey());
            listCryptoPrixItem.setDetails(entry.getValue());
            listCryptoPrix.add(listCryptoPrixItem);
        }

        EvolutionCryptoDTO evolutionCryptoDTO = new EvolutionCryptoDTO();
        evolutionCryptoDTO.setCryptoPrix(listCryptoPrix);

        return evolutionCryptoDTO;
    }


    
}
