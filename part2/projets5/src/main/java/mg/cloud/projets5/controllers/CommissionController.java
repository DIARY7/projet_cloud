package mg.cloud.projets5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.dto.DataTransfertObject;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.services.TypeCommissionService;
import mg.cloud.projets5.services.TokensService;

@RestController
@RequestMapping("/commission")
public class CommissionController {
    @Autowired
    TypeCommissionService typeCommissionService;

    @Autowired
    TokensService tokenService;

    @PostMapping("/edit")
    public DataTransfertObject edit(
        @RequestParam(required = true) Integer typeCommissionId,
        @RequestParam(required = true) Double pourcentage,
        @RequestHeader("Authorization") String authorizationHeader
    ) {
        DataTransfertObject dto = new DataTransfertObject();
        try {
            Users user = tokenService.getUserByToken(authorizationHeader); 
            if (user != null && user.getIsAdmin() == false) {
                dto.unauthorized("Vous n'avez pas les droits pour effectuer cette action");
                return dto;
            } 
            typeCommissionService.update(typeCommissionId,pourcentage);
            dto.success(null,"Mise à jour réussie");
        } catch (Exception e) {
           dto.serverError(e, e.getMessage());
        }
        return dto;
    }
}
