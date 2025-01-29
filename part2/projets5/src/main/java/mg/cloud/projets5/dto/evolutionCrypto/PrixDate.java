package mg.cloud.projets5.dto.evolutionCrypto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PrixDate {
    double prix;
    LocalDateTime date;
}
