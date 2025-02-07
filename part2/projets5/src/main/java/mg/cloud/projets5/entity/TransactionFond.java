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
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transaction_fond")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionFond {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column
    Double entree;

    @Column
    Double sortie;

    @Column
    LocalDateTime dtTransaction;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;

}
