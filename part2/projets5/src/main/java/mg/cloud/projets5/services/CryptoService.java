package mg.cloud.projets5.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.dto.analyseCrypto.AnalyseCrypto;
import mg.cloud.projets5.dto.analyseCrypto.AnalyseCryptoDTO;
import mg.cloud.projets5.dto.coursCrypto.CoursCryptoDTO;
import mg.cloud.projets5.dto.evolutionCrypto.EvolutionCryptoDTO;
import mg.cloud.projets5.dto.evolutionCrypto.ListCryptoPrix;
import mg.cloud.projets5.dto.evolutionCrypto.PrixDate;
import mg.cloud.projets5.dto.transaction.PorteFeuilleCrypto;
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

    
    public AnalyseCryptoDTO analyseCryptoDTO(LocalDateTime startDate, LocalDateTime endDate){
        AnalyseCryptoDTO analyseCryptoDTO = new AnalyseCryptoDTO();
        List<AnalyseCrypto> analyseCryptos = null;
        if(startDate != null && endDate != null) 
        analyseCryptos = prixCryptoRepo.findAnalyseCryptos(startDate, endDate);
        if(startDate == null && endDate == null)
        analyseCryptos = prixCryptoRepo.findAnalyseCryptos();
        if(startDate != null && endDate == null)
        analyseCryptos = prixCryptoRepo.findAnalyseCryptosWithMinDate(startDate);
        if(startDate == null && endDate != null)
        analyseCryptos = prixCryptoRepo.findAnalyseCryptosWithMaxDate(endDate);
        analyseCryptoDTO.setAnalyseCryptos(analyseCryptos);
        return analyseCryptoDTO;
    }


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

    public double getCryptoCurrentPrice(Integer cryptoId){
        double currentPrice = 0;
        return currentPrice;
    }

    public List<Crypto> findAll(){
        return cryptoRepo.findAll();
    }

}
