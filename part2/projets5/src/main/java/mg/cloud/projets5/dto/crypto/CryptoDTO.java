package mg.cloud.projets5.dto.crypto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CryptoDTO {
    String value;
    String label;

    public CryptoDTO(String label,String fullLabel){
        setValue(label);
        setLabel(fullLabel+" ("+getLabel()+")");
    }
}
