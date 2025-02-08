package mg.cloud.projets5.dto.transaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mg.cloud.projets5.entity.Crypto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PorteFeuilleCrypto {
    int idCrypto;
    String nomCrypto;
    double qte;
    double valeur;

    public PorteFeuilleCrypto(int idCrypto,String nomCrypto,double qte){
        setIdCrypto(idCrypto);
        setNomCrypto(nomCrypto);
        setQte(qte);
    }
}
