package mg.cloud.projets5;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.services.FondService;
import mg.cloud.projets5.services.SynchronisationService;

@SpringBootApplication
@EnableScheduling
public class Projets5Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(Projets5Application.class, args);
		// Obtenir l'heure locale à Madagascar
       
        

        
	}

}
