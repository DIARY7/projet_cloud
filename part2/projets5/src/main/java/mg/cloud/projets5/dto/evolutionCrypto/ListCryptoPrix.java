package mg.cloud.projets5.dto.evolutionCrypto;

import java.util.List;

import lombok.Data;
import mg.cloud.projets5.entity.Crypto;

@Data
public class ListCryptoPrix {
    Crypto crypto;
    List<PrixDate> details;
}
