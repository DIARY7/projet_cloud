package mg.cloud.projets5.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PinSent {
    String Email;
    String Pin;
    int ExpiresTokenSeconds;
}

