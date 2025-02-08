package mg.cloud.projets5;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.services.FondService;

@SpringBootApplication
public class Projets5Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(Projets5Application.class, args);
		// FondService fondService = context.getBean(FondService.class);
		// List<TransactionFondDemande> fondDemandes = fondService.generateTest();
		// for (TransactionFondDemande fondDemande : fondDemandes) {
		// 	System.out.println(fondDemande);
		// }
	}

}
