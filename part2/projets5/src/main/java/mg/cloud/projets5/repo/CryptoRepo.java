package mg.cloud.projets5.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mg.cloud.projets5.dto.crypto.CryptoDTO;
import mg.cloud.projets5.entity.Crypto;

public interface CryptoRepo extends JpaRepository<Crypto, Integer> {

    @Query("SELECT new mg.cloud.projets5.dto.crypto.CryptoDTO(c.label, c.fullLabel) FROM Crypto c")
    List<CryptoDTO> findCryptoDTO();
}