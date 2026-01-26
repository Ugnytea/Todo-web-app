package ugnytea.todo_web_app.Components;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer {
    @Autowired
    private JdbcTemplate template;

    @PostConstruct
    public void init() {
        try {
            template.queryForObject("SELECT COUNT(*) FROM Todos", Integer.class);
        } catch (Exception e) {
            template.execute("CREATE TABLE Todos (" +
                    "Id INT AUTO_INCREMENT PRIMARY KEY," +
                    "Title VARCHAR(255) NOT NULL," +
                    "Description VARCHAR(500)," +
                    "Created_at DATE NOT NULL," +
                    "Due_till TIMESTAMP," +
                    "Important BOOL DEFAULT false," +
                    "Completed BOOL DEFAULT false" +
                    ");"
            );
        }
    }
}
