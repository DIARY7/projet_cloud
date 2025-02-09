package mg.cloud.projets5.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.dto.DataTransfertObject;
import mg.cloud.projets5.dto.transaction.fond.TransactionFondDemandeDTO;
import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.services.FondService;
import mg.cloud.projets5.services.TokensService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class FondController {
    @Autowired
    TokensService tokenService;

    @Autowired
    FondService fondService;

    @GetMapping("/fond")
    public DataTransfertObject getFondUser(@RequestHeader("Authorization") String authorizationHeader) {
        DataTransfertObject dto = new DataTransfertObject();
        try {
            Users user = tokenService.getUserByToken(authorizationHeader);            
            HashMap<String , Double> map = new HashMap<String,Double>();
            map.put("data", fondService.getMontantTotal(user.getId()) );
            dto.success(map, null);
        } catch (Exception e) {
            e.printStackTrace();
            dto.error(e.getMessage(), null);
        }
        
        return dto;
    }

    @PostMapping("/fond")
    public DataTransfertObject demandeFond(
        @RequestHeader("Authorization") String authorizationHeader,
        @RequestBody Map<String, Double> request
    ) {
        DataTransfertObject dto = new DataTransfertObject();
        try {
            Users user = tokenService.getUserByToken(authorizationHeader);
            Double entree = request.getOrDefault("entree", 0.0);
            Double sortie = request.getOrDefault("sortie", 0.0);
            TransactionFondDemande transactionFondDemande = new TransactionFondDemande();
            transactionFondDemande.setEntree(entree);
            transactionFondDemande.setSortie(sortie);
            transactionFondDemande.setUsers(user);
            fondService.createDemandeFond(transactionFondDemande);
            dto.success(null, "Demande de transaction envoyé avec succèss");

        } catch (Exception e) {
            dto.serverError(e, null);
        }
        return dto;
    }


    @GetMapping("/fond/transaction")
   public DataTransfertObject getListDemande(@RequestHeader("Authorization") String authorizationHeader) {
       DataTransfertObject dto = new DataTransfertObject();
       HashMap<String, Object> data = new HashMap<>();
       try{
           Users user = tokenService.getUserByToken(authorizationHeader);
           if (user != null && user.getIsAdmin() == false) {
               dto.unauthorized("Vous n'avez pas les droits pour effectuer cette action");
               return dto;
           }
        List<TransactionFondDemandeDTO>  fondDemandeDTOs = fondService.getAlldto();
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
           @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam(name = "demandeId") String demandeIde,
            @RequestParam(name = "valider") Boolean valider)
        {
       DataTransfertObject dto = new DataTransfertObject();
        try{
            Users user = tokenService.getUserByToken(authorizationHeader);
            if (user != null && user.getIsAdmin() == false) {
                dto.unauthorized("Vous n'avez pas les droits pour effectuer cette action");
                return dto;
            }
            fondService.traiterDemande(demandeIde, valider);
            dto.success(null, "transaction traité avec success"); 
        }
        catch(Exception e){
            dto.serverError(e, null);
        }
        return dto;
   }
   

   
    
    

}
