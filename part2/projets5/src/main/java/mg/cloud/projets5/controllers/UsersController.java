package mg.cloud.projets5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import mg.cloud.projets5.dto.Login;
import mg.cloud.projets5.dto.PinSent;
import mg.cloud.projets5.dto.UserForm;
import mg.cloud.projets5.services.UsersService;

@RestController
public class UsersController {
    
    @Autowired
   UsersService usersService;

   @PostMapping("users/inscription")
   public String inscription(@RequestBody UserForm userForm){
        String reponse = usersService.inscription(userForm);
        return reponse;
   }


   @PostMapping("users/inscription/confirm")
   public String confirmPin(@RequestBody PinSent pinSent){
        return usersService.confirmePin(pinSent);
   }

   @PostMapping("users/login")
   public String login(@RequestBody Login login){
        return usersService.login(login);
   }

   @PostMapping("users/login/confirm")
   public String confirmLogin(@RequestBody PinSent pinSent){
        return usersService.confirmPinLogin(pinSent);
   }


}
