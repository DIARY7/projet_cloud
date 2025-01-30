package mg.cloud.projets5.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AchatVenteFond {
    Double ventePrix;
    Double venteQte;
    Double achatPrix;
    Double achatQte;
    String user;
    Double fond;
}
