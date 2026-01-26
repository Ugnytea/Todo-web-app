package ugnytea.todo_web_app.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ugnytea.todo_web_app.Module.Task;

import java.util.*;

//@RestController
//@RequestMapping("api/todos")
@Component
public class TodoController {
    @Autowired
    JdbcTemplate template;

//    @PostMapping
    public void createTask (Task task) {
        String sql = "INSERT INTO Todos (Title, Created_at";
        String values = " VALUES (?, ?";
        ArrayList<Object> params = new ArrayList<>();
        params.add(task.getTitle());
        params.add(task.getCreatedAt());

        if (task.getDescription() != null) {
            sql = sql.concat(", Description");
            values = values.concat(", ?");
            params.add(task.getDescription());
        }
        if (task.getDueTill() != null) {
            sql = sql.concat(", Due_till");
            values = values.concat(", ?");
            params.add(task.getDueTill());
        }

        sql = sql.concat(", Important, Completed)");
        values = values.concat(", ?, ?)");
        params.add(task.isImportant());
        params.add(task.isCompleted());

        sql = sql.concat(values);

        template.update(sql, params.toArray());
    }

//    @PostMapping
    public void updateTask (Task task) {
        String sql = "UPDATE Todos SET ";
        ArrayList<Object> params = new ArrayList<>();

        if (task.getTitle() != null) {
            sql = sql.concat("Title=?, ");
            params.add(task.getTitle());
        }
        if (task.getDescription() != null) {
            sql = sql.concat("Description=?, ");
            params.add(task.getTitle());
        }
        if (task.getDueTill() != null) {
            sql = sql.concat("Due_till=?, ");
            params.add(task.getDueTill());
        }

        sql = sql.concat("Important=?, Completed=? WHERE id=?");
        params.add(task.isImportant());
        params.add(task.isCompleted());
        params.add(task.getId());

        template.update(sql, params.toArray());
    }

//    @GetMapping
    public List<Task> getAllTasks () {
        String sql = "SELECT * FROM Todos";
        var bprm = new BeanPropertyRowMapper<>(Task.class);

        return template.query(sql, bprm);
    }

//    @PostMapping
    public void deleteTask (Task task) {
        String sql = "DELETE FROM Todos WHERE id=?";
        template.update(sql, task.getId());
    }
}
