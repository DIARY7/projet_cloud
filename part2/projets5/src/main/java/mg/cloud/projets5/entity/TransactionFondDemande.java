package mg.cloud.projets5.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mg.cloud.projets5.utils.ProjectUtils;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionFondDemande {

    @Id
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
    private void generateIdAndSetTransactionDate() {
        // Générer un ID unique si non déjà défini
        if (this.id == null || this.id.isEmpty()) {
            this.id = UUID.randomUUID().toString();
        }
        // Définit automatiquement la date de transaction si elle est nulle
        if (this.dtTransaction == null) {
            this.dtTransaction = ProjectUtils.getTimeNow();
        }
    }





}
