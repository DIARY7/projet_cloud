package mg.cloud.projets5.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class SynchronisationService {
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void synchroToLocalAndOnline(){
        LocalDateTime lastSynchro = getLastSync();
        synchroToLocal(lastSynchro);
        synchroToOnline(lastSynchro);
        updateDate();
    }

    private void synchroToLocal(LocalDateTime lastSync){
        // synchro to local 
    }

    private void synchroToOnline(LocalDateTime lastSync){
        // syncrho to Online
    }

    private void updateDate(){
        LocalDateTime.now();
    }

    public LocalDateTime getLastSync(){
        return LocalDateTime.now();
    }
}
