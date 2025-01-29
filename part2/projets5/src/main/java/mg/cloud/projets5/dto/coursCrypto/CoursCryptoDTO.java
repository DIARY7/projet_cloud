package mg.cloud.projets5.dto.coursCrypto;

import java.util.List;

import lombok.Data;
import mg.cloud.projets5.entity.PrixCrypto;

@Data
public class CoursCryptoDTO {
    List<PrixCrypto> cryptoPrix;
}