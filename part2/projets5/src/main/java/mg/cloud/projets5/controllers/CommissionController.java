package mg.cloud.projets5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.services.TypeCommissionService;

@RestController
@RequestMapping("/commission")
public class CommissionController {
      @Autowired
    TypeCommissionService typeCommissionService;

       @PostMapping("/insert")
    public void insert(
        @RequestParam(required = true) Integer typeCommissionId,
        @RequestParam(required = true) Double pourcentage
    ) {
        try {
            typeCommissionService.update(typeCommissionId,pourcentage);
        } catch (Exception e) {
           
        }
    }
}
