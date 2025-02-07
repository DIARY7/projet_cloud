package mg.cloud.projets5.dto;
import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AchatVenteFond {
    BigDecimal ventePrix;
    BigDecimal venteQte;
    BigDecimal achatPrix;
    BigDecimal achatQte;
    String user;
    BigDecimal fond;
}
