package mg.cloud.projets5.dto.commissionCrypto;

import lombok.Data;
import mg.cloud.projets5.entity.Crypto;

@Data
public class CommissionCrypto {
    Crypto crypto;
    double moyenne;
    double somme;
}
