package mg.cloud.projets5.controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import mg.cloud.projets5.dto.DataTransfertObject;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.services.FondService;
import mg.cloud.projets5.services.TokensService;

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

}
