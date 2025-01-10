package mg.cloud.projets5.utils;

public class ConversionCrypto {
    
    public static Double FondToCrypto(Double fondDonnee, Double prixUnitaire){
        return fondDonnee/prixUnitaire;
    }


    public static Double CryptoToFond(Double crypto, Double prixUnitaire){
        return crypto * prixUnitaire;
    }
}
