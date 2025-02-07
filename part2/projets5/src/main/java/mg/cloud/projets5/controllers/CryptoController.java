package mg.cloud.projets5.controllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.dto.DataTransfertObject;
import mg.cloud.projets5.dto.analyseCrypto.AnalyseCryptoDTO;
import mg.cloud.projets5.dto.crypto.CryptoDTO;
import mg.cloud.projets5.dto.evolutionCrypto.EvolutionCryptoDTO;
import mg.cloud.projets5.services.CryptoService;

@RestController
@RequestMapping("/crypto")
public class CryptoController {
    
    @Autowired
    private CryptoService cryptoService;
    

    @GetMapping("/analyse")
    public DataTransfertObject getAnalyse(
            @RequestParam(name = "start",required = false) LocalDateTime start,
            @RequestParam(name = "end", required = false) LocalDateTime end){
                DataTransfertObject dto = new DataTransfertObject();
                Map<String, Object> map = new HashMap<>();
                try {
                    AnalyseCryptoDTO cryptoDTO = cryptoService.analyseCryptoDTO(start, end);
                    map.put("analyse", cryptoDTO);
                    dto.success(map,null);
                } catch (Exception e) {
                    dto.serverError(null,e.getMessage());
                }
                return dto;
            }

    @GetMapping("/evolution")
    public DataTransfertObject getEvolotion(){
        DataTransfertObject dto = new DataTransfertObject();
        Map<String, Object> map = new HashMap<>();
        try {
            EvolutionCryptoDTO evolutionCryptoDTO = cryptoService.getEvolutionCrypto();
            List<CryptoDTO> crypto = cryptoService.findAllDTO();
            map.put("evolution", evolutionCryptoDTO);
            map.put("cryptos",crypto);
            dto.success(map, null);
        } catch (Exception e) {
            dto.serverError(null,e.getMessage());
        }
        return dto;
    }

    @GetMapping("/cours")
    public DataTransfertObject getCours(){
        DataTransfertObject dto = new DataTransfertObject();
        HashMap<String,Object> map = new HashMap<>();
        try{
            map.put("cours", cryptoService.getCoursCrypto());
            dto.success(map, null);
        }
        catch(Exception e){
            dto.error(null, e.getMessage());
        }
        return dto;
    }
}
