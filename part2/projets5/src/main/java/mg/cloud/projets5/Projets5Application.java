package mg.cloud.projets5;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.services.FondService;
import mg.cloud.projets5.services.SynchronisationService;

@SpringBootApplication
public class Projets5Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(Projets5Application.class, args);
		SynchronisationService synchronisationService = context.getBean(SynchronisationService.class);
		try {
			synchronisationService.synchroToLocalAndOnline();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
