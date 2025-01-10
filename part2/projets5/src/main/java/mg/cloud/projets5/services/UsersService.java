package mg.cloud.projets5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import mg.cloud.projets5.dto.Login;
import mg.cloud.projets5.dto.PinSent;
import mg.cloud.projets5.dto.UserForm;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.repo.UsersRepo;

@Service
public class UsersService{

    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    private UsersRepo usersRepo;

   

    public String inscription(UserForm userForm){
        String url = "http://dotnet:5000/api/Users"; // Utilisez le nom du service Docker
        ResponseEntity<String> response =  restTemplate.postForEntity(url, userForm, String.class);
        return response.getBody();
    }


    public String confirmePin(PinSent pinSent){
        String url = "http://dotnet:5000/confirm";
        ResponseEntity<String> response = restTemplate.postForEntity(url, pinSent, String.class);
        return response.getBody();
    }

    public String login(Login login){
        String url = "http://dotnet:5000/login";
        ResponseEntity<String> response = restTemplate.postForEntity(url, login, String.class);
        return response.getBody();
    }

    public String confirmPinLogin(PinSent pinSent){
        String url = "http://dotnet:5000/confirmLogin";
        ResponseEntity<String> response = restTemplate.postForEntity(url, pinSent, String.class);
        return response.getBody();
    }

    public Users findById(Long id){
        Users users = usersRepo.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Not found"));

        users.setPwd(null);
        return users;
    }

}