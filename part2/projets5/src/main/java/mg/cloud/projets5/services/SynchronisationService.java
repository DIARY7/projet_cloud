package mg.cloud.projets5.services;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.cloud.FirestoreClient;

import mg.cloud.projets5.entity.Users;

@Service
public class SynchronisationService {

    @Autowired
    UsersService usersService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void synchroToLocalAndOnline() throws Exception {

        Firestore db = FirestoreClient.getFirestore();
        LocalDateTime lastSynchro = getLastSync();
        synchroToLocal(lastSynchro,db);
        synchroToOnline(lastSynchro,db);
        updateDate();
    }

    private void synchroToLocal(LocalDateTime lastSync,Firestore db) {
        // Synchronisation vers local
    }

    private void synchroToOnline(LocalDateTime lastSync,Firestore db) throws Exception {
        // users
        List<Users> newUsers = usersService.getUsersAddedAfter(lastSync);
        for (Users users : newUsers) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("id_user", users.getId());
            userData.put("full_name", users.getFullName());
            userData.put("email", users.getEmail());
            userData.put("pdp","https://robohash.org/"+users.getId()+"?set=set1");
            userData.put("pwd", users.getPassword());

            db.collection("users").document(UUID.randomUUID().toString())
              .set(userData)
              .get();  // Envoie les données

            CreateRequest request = new CreateRequest()
                .setEmail(users.getEmail())
                .setPassword(users.getPassword())
                .setDisplayName(users.getFullName())
                .setUid(users.getId().toString()); // Id utilisateur local

          UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
          System.out.println("Utilisateur ajouté à Firebase Auth: " + userRecord.getUid());

        }

        // crypto

        // prix_crypto

        // transactio_crypto 
    }

    private void updateDate() {
        LocalDateTime now = LocalDateTime.now();
        String sql = "INSERT INTO synchro_date (dt_sync) VALUES (?)";
        jdbcTemplate.update(sql, now);
    }
    

    private LocalDateTime getLastSync() {
        String sql = "SELECT MAX(dt_sync) FROM synchro_date";
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            Timestamp timestamp = rs.getTimestamp(1);
            return timestamp != null ? timestamp.toLocalDateTime() : null;
        });
    }
}
