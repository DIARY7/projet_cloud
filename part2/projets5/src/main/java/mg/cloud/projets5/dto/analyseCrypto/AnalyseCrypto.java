package mg.cloud.projets5.dto.analyseCrypto;

import lombok.AllArgsConstructor;
import lombok.Data;
import mg.cloud.projets5.entity.Crypto;

@Data
@AllArgsConstructor
public class AnalyseCrypto {
    Crypto crypto;
    double min;
    double max;
    double moyenne;
    double firstQuartile;
    double ecartType;
}
