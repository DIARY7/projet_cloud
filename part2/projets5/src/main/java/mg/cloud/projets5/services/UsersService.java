package mg.cloud.projets5.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.repo.UsersRepo;

@Service
public class UsersService {
    @Autowired
    UsersRepo usersRepo;

     public List<Users> findAll(){
        return usersRepo.findAll();
    }
}
