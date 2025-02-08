package mg.cloud.projets5.controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.dto.DataTransfertObject;
import mg.cloud.projets5.dto.transaction.fond.TransactionFondDemandeDTO;
import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.services.CryptoService;
import mg.cloud.projets5.services.FondService;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class TestController {
    
    @Autowired
    FondService service;

     


   @GetMapping("/fond/transaction")
   public DataTransfertObject getListDemande() {
       DataTransfertObject dto = new DataTransfertObject();
       HashMap<String, Object> data = new HashMap<>();
       try{
        List<TransactionFondDemandeDTO>  fondDemandeDTOs = service.getAlldto();
        data.put("demandes", fondDemandeDTOs);
        dto.success(data,"Donnée bien pris ");
       }
       catch(Exception e){
            dto.serverError(e, null);
       }
       return dto;
       
   }


   @PostMapping("/fond/transaction")
   public DataTransfertObject insert(
            @RequestParam(name = "demandeId") String demandeIde,
            @RequestParam(name = "valider") Boolean valider)
        {
       DataTransfertObject dto = new DataTransfertObject();
       HashMap<String, Object> data = new HashMap<>();
        try{
            service.traiterDemande(demandeIde, valider); 
            List<TransactionFondDemandeDTO>  fondDemandeDTOs = service.getAlldto();
            data.put("demandes", fondDemandeDTOs);
            dto.success(data, "Transaction Valider");
        }
        catch(Exception e){
            dto.serverError(e, null);
        }
        return dto;
   }
   
   

}
