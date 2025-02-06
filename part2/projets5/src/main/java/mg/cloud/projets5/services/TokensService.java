package mg.cloud.projets5.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.entity.Tokens;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.repo.TokensRepo;

@Service
public class TokensService {
    @Autowired
    TokensRepo tokenRepo;

    public Users getUserByToken(String authorizationHeader ) throws Exception {
        Users user = null;
        if (authorizationHeader !=null && authorizationHeader.startsWith("Bearer")) {
            try {
                String token = authorizationHeader.substring(7);            
                Tokens tok = tokenRepo.findByToken(token).orElseThrow(()-> new Exception("Token invalide"));
                if (tok.getExpiresAt().isBefore(LocalDateTime.now())) {
                    throw new Exception(" Ce token est obsolète ");
                }
                user = tok.getUser();
            }
            catch(Exception e){
                throw e;
            }
        }
        else{
            throw new Exception("Token innexistant ");
        }
        return user;
    }
}
