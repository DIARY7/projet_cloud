package mg.cloud.projets5.controller.transaction;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.entity.TransactionCrypto;
import mg.cloud.projets5.entity.TransactionFond;
import mg.cloud.projets5.services.TransactionCrytoService;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class TransactionController {
    @Autowired
    TransactionCrytoService transCryptoService;

    @GetMapping("/achat")
    public List< TransactionCrypto > getAllAchat() {
        return transCryptoService.getAllAchat();
    }
    

    @PostMapping("/achat/new")
    public ResponseEntity<String> addAchat(@RequestBody TransactionCrypto achat) {
        // Code pour insérer l'élément dans la base de données
        
        return ResponseEntity.status(HttpStatus.CREATED).body("Achat inserer avec succees");
    }

    @GetMapping("/vente")
    public List< TransactionCrypto > getAllVente() {
        return transCryptoService.getAllVente();
    }
    

    @PostMapping("/vente/new")
    public ResponseEntity<String> addVente (@RequestBody TransactionCrypto achat) {
        //TODO: process POST request
        
        return ResponseEntity.status(HttpStatus.CREATED).body("Vente inserer avec succees");
    }

    @PostMapping("/depot/new")
    public ResponseEntity<String> addDepot(@RequestBody TransactionFond depot,String token) {
        //TODO: process POST request

        return ResponseEntity.status(HttpStatus.CREATED).body("Depot reussi ");
    }

    @PostMapping("/retrait/new")
    public ResponseEntity<String> addRetrait(@RequestBody TransactionFond retrait,String token){

        return ResponseEntity.status(HttpStatus.CREATED).body("Retrait reussi ");
    }
    
    
}
