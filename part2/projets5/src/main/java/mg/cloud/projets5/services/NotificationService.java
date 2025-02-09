package mg.cloud.projets5.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

@Service
public class NotificationService {

    private static final String EXPO_API_URL = "https://exp.host/--/api/v2/push/send";

    public void envoyerNotification(String expoPushToken, String title, String body) {
        // Préparer les données de la requête
        Map<String, String> notificationData = new HashMap<>();
        notificationData.put("to", expoPushToken);
        notificationData.put("title", title);
        notificationData.put("body", body);

        // Configuration des headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Créer l'objet de la requête
        HttpEntity<Map<String, String>> request = new HttpEntity<>(notificationData, headers);

        // Envoyer la requête
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                EXPO_API_URL, HttpMethod.POST, request, String.class
            );
            System.out.println("Réponse de l'API Expo : " + response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Erreur lors de l'envoi de la notification.");
        }
    }
}
