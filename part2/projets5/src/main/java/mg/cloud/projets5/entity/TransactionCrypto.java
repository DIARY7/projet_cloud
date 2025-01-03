package mg.cloud.projets5.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Transaction_Crypto")
public class TransactionCrypto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_transaction", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateTransaction;

    @Column(nullable = false)
    private Double entree;

    @Column(nullable = false)
    private Double sortie;

    @ManyToOne
    @JoinColumn(name = "crypto_id", nullable = false)
    private Cryptos crypto;

    @ManyToOne
    @JoinColumn(name = "devise_id", nullable = false)
    private Devises devise;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(nullable = false)
    private Double montant;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(LocalDateTime dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

    public Double getEntree() {
        return entree;
    }

    public void setEntree(Double entree) {
        this.entree = entree;
    }

    public Double getSortie() {
        return sortie;
    }

    public void setSortie(Double sortie) {
        this.sortie = sortie;
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

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }
}
