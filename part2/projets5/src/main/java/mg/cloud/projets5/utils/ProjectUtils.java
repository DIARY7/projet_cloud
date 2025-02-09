package mg.cloud.projets5.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ProjectUtils {
    

    static ZoneId zoneMadagascar = ZoneId.of("Indian/Antananarivo");
    
    public static LocalDateTime getTimeNow(){
        return ZonedDateTime.now(zoneMadagascar).toLocalDateTime();
    }
}
