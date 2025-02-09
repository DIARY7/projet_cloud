package mg.cloud.projets5.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.cloud.projets5.dto.commissionCrypto.CommissionCrypto;
import mg.cloud.projets5.dto.commissionCrypto.CommissionCryptoDTO;
import mg.cloud.projets5.repo.CommissionRepo;

@Service
public class CommissionService {
    @Autowired
    CommissionRepo commissionRepo;

    public CommissionCryptoDTO analyseCommmissionDTO(LocalDateTime startDate,LocalDateTime endDate){
        CommissionCryptoDTO commissionCryptosDTO= new CommissionCryptoDTO();
        List<CommissionCrypto> commissionCryptos = null;
        if(startDate != null && endDate != null) 
        commissionCryptos = commissionRepo.findCommissionCryptos(startDate, endDate);
        if(startDate == null && endDate == null)
        commissionCryptos = commissionRepo.findCommissionCryptos();
        if(startDate != null && endDate == null)
        commissionCryptos = commissionRepo.findCommissionCryptosWithMinDate(startDate);
        if(startDate == null && endDate != null)
        commissionCryptos = commissionRepo.findCommissionCryptosWithMaxDate(endDate);
        commissionCryptosDTO.setAnalyseCommissionCryptos(commissionCryptos);
        return commissionCryptosDTO;
    }
}
