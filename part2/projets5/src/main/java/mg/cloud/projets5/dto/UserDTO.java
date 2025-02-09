package mg.cloud.projets5.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    Integer id;
    String fullname;
    String email;
    String pdp;

    public UserDTO(Integer id,String fullname,String email){
        setId(id);
        setEmail(email);
        setFullname(fullname);
    }


}
