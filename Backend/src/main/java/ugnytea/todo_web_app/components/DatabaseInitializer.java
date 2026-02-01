package ugnytea.todo_web_app.components;

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
            template.queryForObject("SELECT COUNT(*) FROM TaskList", Integer.class);
        } catch (Exception e) {
            template.execute("CREATE TABLE TaskList (" +
                    "Id INT AUTO_INCREMENT PRIMARY KEY," +
                    "Name VARCHAR(255) NOT NULL" +
                    ");"
            );
        }

        try {
            template.queryForObject("SELECT COUNT(*) FROM Task", Integer.class);
        } catch (Exception e) {
            template.execute("CREATE TABLE Task (" +
                    "Id INT AUTO_INCREMENT PRIMARY KEY," +
                    "Title VARCHAR(255) NOT NULL," +
                    "Description VARCHAR(500)," +
                    "Created_at DATE NOT NULL," +
                    "Due_till TIMESTAMP," +
                    "Important BOOL DEFAULT false," +
                    "Completed BOOL DEFAULT false," +
                    "Group_id INTEGER REFERENCES TaskList(Id) ON DELETE SET NULL" +
                    ");"
            );
        }
    }
}
