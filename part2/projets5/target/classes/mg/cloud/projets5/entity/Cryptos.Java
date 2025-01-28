package mg.cloud.projets5.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "crypto")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cryptos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "label", length = 50)
    private String label;

}