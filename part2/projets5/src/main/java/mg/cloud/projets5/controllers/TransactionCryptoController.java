package mg.cloud.projets5.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.dto.DataTransfertObject;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.services.CryptoService;
import mg.cloud.projets5.services.TokensService;
import mg.cloud.projets5.services.TransactionCryptoService;
import mg.cloud.projets5.services.UsersService;

@RestController
@RequestMapping("/TransCrypto")
public class TransactionCryptoController {

     @Autowired
    TransactionCryptoService transactionCryptoService;
     @Autowired
    UsersService usersService;
     @Autowired
    CryptoService cryptoService;

    @Autowired
    TokensService tokenService;
    
    //Liste operations 
     @GetMapping("/List")
    public DataTransfertObject getList(
        @RequestParam(required = false) Integer cryptoId,
        @RequestParam(required = false) Integer userId,
        @RequestParam(required = false) LocalDate dateDebut,
        @RequestParam(required = false) LocalDate dateFin
    ) {
        DataTransfertObject dto = new DataTransfertObject();

        HashMap<String , List<?>> map = new HashMap<String,List<?>>();
            map.put("listTransactionCrypto", transactionCryptoService.filterByUserIdAndDateAndCryptoId(cryptoId, userId, dateDebut, dateFin));
            map.put("listCrypto",cryptoService.findAll() );
            map.put("listUser", usersService.findAll());
            dto.success(map,null);
            
        return dto;
    }


    // Liste Total achat , total vente (Prix et Quantite) ,Fond actuel
     @GetMapping("/ListResume")
    public DataTransfertObject getEtat(
        @RequestParam(required = false) LocalDate dateFin
    ) {
        DataTransfertObject dto = new DataTransfertObject();

        HashMap<String , List<?>> map = new HashMap<String,List<?>>();
            map.put("listEtat", transactionCryptoService.filterAchatVenteFond(dateFin));
            dto.success(map,null);
            
        return dto;
    }

    @GetMapping("/porteFeuille")
    public DataTransfertObject getPorteFeuille(@RequestHeader("Authorization") String authorizationHeader) {
        DataTransfertObject dto = new DataTransfertObject();
        try {
            Users user = tokenService.getUserByToken(authorizationHeader);            
            HashMap<String , List<?>> map = new HashMap<String,List<?>>();
            map.put("data", transactionCryptoService.getWalletCrypto(user.getId()));
            dto.success(map, null);
        } catch (Exception e) {
            e.printStackTrace();
            dto.error(e.getMessage(), null);
        }
        
        return dto;
    }


    
}
