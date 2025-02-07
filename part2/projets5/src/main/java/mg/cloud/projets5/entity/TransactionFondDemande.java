package mg.cloud.projets5.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "transaction_fond")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionFondDemande {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transaction_fond_seq_gen")
    @SequenceGenerator(name = "transaction_fond_seq_gen", sequenceName = "transaction_fond_seq", allocationSize = 1)
    @Column(length = 20, unique = true, nullable = false)
    private String id;

    @Column
    private Double entree;

    @Column
    private Double sortie;

    @Column(name = "dt_transaction")
    private LocalDateTime dtTransaction;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    @PrePersist
    public void generateId() {
        if (this.id == null || this.id.isEmpty()) {
            this.id = "TR-" + String.format("%06d", Long.parseLong(id));
        }
    }
}
