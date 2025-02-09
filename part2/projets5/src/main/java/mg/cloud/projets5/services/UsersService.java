package mg.cloud.projets5.services;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

import mg.cloud.projets5.dto.AchatVenteFond;
import mg.cloud.projets5.dto.Pdp;
import mg.cloud.projets5.entity.TransactionFondDemande;
import mg.cloud.projets5.entity.Users;
import mg.cloud.projets5.repo.UsersRepo;

@Service
public class UsersService {
    @Autowired
    UsersRepo usersRepo;

     public List<Users> findAll(){
        return usersRepo.findAll();
    }

    public List<Users> getUsersAddedAfter(LocalDateTime date) {
        return usersRepo.findUsersAddedAfter(date);
    }

   public Map<Integer, String> getUsersProfile() throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference collection = db.collection("users");

        // Lire les documents existants
        ApiFuture<QuerySnapshot> querySnapshot = collection.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
        Map<Integer, String> userProfileMap = new HashMap<>();

        for (QueryDocumentSnapshot doc : documents) {
            Integer id = doc.getLong("id_user").intValue(); // Lecture sûre du type Long
            String url = doc.getString("pdp");
            userProfileMap.put(id, url);
        }
        return userProfileMap;
    }
}
