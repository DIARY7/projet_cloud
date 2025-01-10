package mg.cloud.projets5.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.dto.UserFond;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.repo.TransactionCryptoRepo;
import mg.cloud.projets5.repo.TransactionFondRepo;
import mg.cloud.projets5.repo.UsersRepo;


@Service
public class UserFondService {
    @Autowired
    TransactionFondRepo transactionFondRepo;

    @Autowired
    TransactionCryptoRepo transactionCryptoRepo;
  
    @Autowired
    UsersRepo userRepo;
    

    public List<UserFond> findAll(LocalDateTime date){
        List<Users> user = userRepo.findAll();
        List<UserFond> liste = new ArrayList<>();
        for (Users users : user) {
            UserFond uf = transactionFondRepo.FindUserFond(date, users.getId());
            uf.setCrypto(transactionCryptoRepo.findPorteFeuilleCrypto(users.getId()));
            liste.add(uf);
        }
        return liste;
    }
}
