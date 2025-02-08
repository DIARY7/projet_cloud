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

     
   

}
