package mg.cloud.projets5.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Conversions")
public class Conversions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double value;

    @ManyToOne
    @JoinColumn(name = "crypto_id", nullable = false)
    private Cryptos crypto;

    @ManyToOne
    @JoinColumn(name = "devise_id", nullable = false)
    private Devises devise;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Cryptos getCrypto() {
        return crypto;
    }

    public void setCrypto(Cryptos crypto) {
        this.crypto = crypto;
    }

    public Devises getDevise() {
        return devise;
    }

    public void setDevise(Devises devise) {
        this.devise = devise;
    }
}
