package mg.cloud.projets5.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.repo.TransactionCryptoRepo;
import mg.cloud.projets5.dto.AchatVenteFond;
import mg.cloud.projets5.dto.transaction.PorteFeuilleCrypto;
import mg.cloud.projets5.entity.TransactionCrypto;

@Service
public class TransactionCryptoService {
    @Autowired
    TransactionCryptoRepo transactionCryptoRepo;

    @Autowired
    CryptoService cryptoService;

    public List<TransactionCrypto> filterByUserIdAndDateAndCryptoId(Integer cryptoId,Integer userId,LocalDate date_debut,LocalDate date_fin){
        LocalDateTime dateDebutTime = (date_debut != null) ? date_debut.atStartOfDay() : null;
        LocalDateTime dateFinTime = (date_fin != null) ? date_fin.atTime(23, 59, 59) : null;
        
        List<TransactionCrypto> listCrypt = transactionCryptoRepo.findAll();
        return listCrypt.stream()
         .filter(t -> (cryptoId == null || t.getCrypto().getId().equals(cryptoId)))
         .filter(t -> (userId == null || t.getUsers().getId().equals(userId)))
        .filter(t -> (dateDebutTime == null || !t.getDtTransaction().isBefore(dateDebutTime)))
        .filter(t -> (dateFinTime == null || !t.getDtTransaction().isAfter(dateFinTime)))
        .collect(Collectors.toList());
    }

    public List<AchatVenteFond> filterAchatVenteFond(LocalDate date_fin){
        LocalDateTime dateFinTime = null;
        if (date_fin == null) {
            dateFinTime = LocalDateTime.now();   
        }else{
            dateFinTime = date_fin.atTime(23, 59, 59);
        }
        return transactionCryptoRepo.findFilterEtat(dateFinTime);
        
    }

    public  List<PorteFeuilleCrypto> getWalletCrypto(int idUser){
        List<PorteFeuilleCrypto> listePorteFeuilles = transactionCryptoRepo.getWalletUser(idUser);
        for (int i = 0; i < listePorteFeuilles.size(); i++) {
            double valeur = listePorteFeuilles.get(i).getQte() * cryptoService.getCryptoCurrentPrice(listePorteFeuilles.get(i).getIdCrypto()); 
            listePorteFeuilles.get(i).setValeur(valeur);
        }     
        return listePorteFeuilles;
    }

    public List<PorteFeuilleCrypto> getWalletCrypto2(int idUser) {
        List<PorteFeuilleCrypto> listePorteFeuilles = transactionCryptoRepo.getWalletUser2(idUser);
        for (int i = 0; i < listePorteFeuilles.size(); i++) {
            double valeur = listePorteFeuilles.get(i).getQte()
                    * cryptoService.getCryptoCurrentPrice(listePorteFeuilles.get(i).getIdCrypto());
            listePorteFeuilles.get(i).setValeur(valeur);
        }
        return listePorteFeuilles;
    }
}
