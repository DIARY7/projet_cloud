package mg.cloud.projets5.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import mg.cloud.projets5.entity.Tokens;

public interface TokensRepo extends JpaRepository<Tokens,Integer> {
    Optional<Tokens> findByToken(String token);
}
