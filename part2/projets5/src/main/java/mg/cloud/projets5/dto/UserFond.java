package mg.cloud.projets5.dto;

import mg.cloud.projets5.entity.Users;

public class UserFond{
    Double achat;
    Double vente;
    Double portefeuille;
    Users user;
    Double crypto;

    public UserFond(Double achat,Double vente, Double portefeuille,Users user){
        this.portefeuille = portefeuille;
        this.achat = achat;
        this.vente = vente;
        this.user = user;
    }

    public void setCrypto(Double crypto){
        this.crypto = crypto;
    }
}
