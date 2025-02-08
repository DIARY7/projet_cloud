package mg.cloud.projets5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.dto.DataTransfertObject;
import mg.cloud.projets5.services.TypeCommissionService;

@RestController
@RequestMapping("/commission")
public class CommissionController {
      @Autowired
    TypeCommissionService typeCommissionService;

    @PostMapping("/edit")
    public DataTransfertObject edit(
        @RequestParam(required = true) Integer typeCommissionId,
        @RequestParam(required = true) Double pourcentage
    ) {
        DataTransfertObject dto = new DataTransfertObject();
        try {
            typeCommissionService.update(typeCommissionId,pourcentage);
            dto.success(null,"Mise à jour réussie");
        } catch (Exception e) {
           dto.serverError(e, e.getMessage());
        }
        return dto;
    }
}
