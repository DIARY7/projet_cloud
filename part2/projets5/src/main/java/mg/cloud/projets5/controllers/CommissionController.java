package mg.cloud.projets5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.entity.Commission;
import mg.cloud.projets5.services.CommissionService;

@RestController
@RequestMapping("/commission")
public class CommissionController {
      @Autowired
    CommissionService commissionService;

       @PostMapping("/insert")
    public void insert(
        @RequestParam(required = true) Commission commission
    ) {
        try {
            commissionService.save(commission);
        } catch (Exception e) {
           
        }
    }
}
