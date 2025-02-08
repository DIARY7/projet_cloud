package mg.cloud.projets5.controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.dto.DataTransfertObject;
import mg.cloud.projets5.dto.transaction.fond.TransactionFondDemandeDTO;
import mg.cloud.projets5.services.CryptoService;
import mg.cloud.projets5.services.FondService;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class TestController {
    
    @Autowired
    FondService service;

     


   @GetMapping("/fond/transaction")
   public DataTransfertObject getMethodName() {
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
   

}
