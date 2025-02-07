package mg.cloud.projets5.entity;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tokens") // Facultatif si le nom de la table est différent
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tokens {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String token;

    LocalDateTime createdAt;
    LocalDateTime expiresAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users user;
}
