package mg.cloud.projets5.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
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
@Table(name = "prix_crypto")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PrixCrypto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column
    LocalDateTime daty;

    @Column
    Double prix;

    @ManyToOne
    @JoinColumn(name = "crypto_id")
    Cryptos crypto;

}
