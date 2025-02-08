package mg.cloud.projets5.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Commission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column
    Double commission;

    @Column
    Double pourcentage;

    @ManyToOne
    @JoinColumn(name = "transaction_crypto_id")
    TransactionCrypto transactionCrypto;

}
