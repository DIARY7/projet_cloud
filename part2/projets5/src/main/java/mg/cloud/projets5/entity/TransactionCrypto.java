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
@Table(name = "transaction_crypto")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionCrypto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column
    Double puCrypto;

    @Column
    Double prix;

    @Column
    Double qte;

    @Column
    LocalDateTime dtTransaction;

    @ManyToOne
    @JoinColumn(name = "type_commission_id")
    TypeCommission commission;

    @ManyToOne
    @JoinColumn(name = "crypto_id")
    Crypto crypto;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;
}
