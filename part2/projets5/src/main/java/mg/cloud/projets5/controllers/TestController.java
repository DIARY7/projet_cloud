package mg.cloud.projets5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.services.FondService;



@RestController
public class TestController {
    
    @Autowired
    FondService service;

     
   

}
