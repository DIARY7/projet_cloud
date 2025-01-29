package mg.cloud.projets5.controllers;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.dto.DataTransfertObject;
import mg.cloud.projets5.services.CryptoService;

@RestController
public class TestController {
    
    @Autowired
    CryptoService service;


    @GetMapping("/evolutionCrypto")
    public DataTransfertObject evolutionCrypto(){
        DataTransfertObject dto = new DataTransfertObject();
        HashMap<String,Object> map = new HashMap();
        map.put("evolution", service.getEvolutionCrypto());
        try{
            dto.success(map, null);
        }
        catch(Exception e){
            dto.error(null, e.getMessage());
        }
        return dto;
    }

    @GetMapping("/coursCrypto")
    public DataTransfertObject coursCrypto(){
        DataTransfertObject dto = new DataTransfertObject();
        HashMap<String,Object> map = new HashMap();
        try{
            map.put("cours", service.getCoursCrypto());
            dto.success(map, null);
        }
        catch(Exception e){
            dto.error(null, e.getMessage());
        }
        return dto;
    }

    @GetMapping("/analyseCrypto")
    public DataTransfertObject analyseCrypto(){
        DataTransfertObject dto = new DataTransfertObject();
        HashMap<String,Object> map = new HashMap();
        try {
            map.put("analyse", service.analyseCryptoDTO(null, null));
            dto.success(map, null);
        } catch (Exception e) {
            dto.error(null, e.getMessage());
        }
        return dto;
    }


}
