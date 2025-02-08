package mg.cloud.projets5.dto.transaction.fond;

import java.time.LocalDateTime;

import lombok.Data;
import mg.cloud.projets5.dto.UserDTO;

@Data
public class TransactionFondDemandeDTO {
    String id;
    UserDTO user;
    Double entree;
    Double sortie;
    LocalDateTime date;


    public TransactionFondDemandeDTO(String id, Double entre, Double sortie,LocalDateTime date, Integer userId, String email, String fullname){
        setId(id);
        setUser(new UserDTO(userId,fullname,email));
        setEntree(entre);
        setSortie(sortie);
        setDate(date);
    }

    
}
