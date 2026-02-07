package ugnytea.todo_web_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import ugnytea.todo_web_app.module.Task;
import ugnytea.todo_web_app.module.TaskList;

import java.util.*;

@RestController
@RequestMapping("api/todos")
public class TodoController {
    @Autowired
    JdbcTemplate template;

    @GetMapping("/task/{id}")
    public ResponseEntity<Task> getTask (@PathVariable int id) {
        try {
            String sql = "SELECT * FROM Task WHERE Id=?";
            Task task = template.queryForObject(sql, new BeanPropertyRowMapper<>(Task.class), new Object[]{id});

            return ResponseEntity.ok(task);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks () {
        try {
            String sql = "SELECT * FROM Task";
            List<Task> tasks = template.query(sql, new BeanPropertyRowMapper<>(Task.class));

            return ResponseEntity.ok(tasks);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/groupOfTasks/{id}")
    public ResponseEntity<List<Task>> getGroupOfTasks(@PathVariable int id) {
        try {
            String sql = "SELECT * FROM Task WHERE Group_id=?";
            List<Task> tasks = template.query(sql, new BeanPropertyRowMapper<>(Task.class), new Object[]{id});

            return ResponseEntity.ok(tasks);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createTask (@RequestBody Task task) {
        try {
            String sql = "INSERT INTO Task (Title, Created_at";
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
            if (task.getGroupId() != null) {
                sql = sql.concat(", Group_id");
                values = values.concat(", ?");
                params.add(task.getGroupId());
            }

            sql = sql.concat(", Important, Completed)");
            values = values.concat(", ?, ?)");
            params.add(task.isImportant());
            params.add(task.isCompleted());

            sql = sql.concat(values);

            template.update(sql, params.toArray());

            return ResponseEntity.ok("Task created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create task.");
        }

    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTask (@RequestBody Task task) {
        try {
            String sql = "UPDATE Task SET ";
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

            sql = sql.concat("Important=?, Completed=?, Group_id=? WHERE Id=?");
            params.add(task.isImportant());
            params.add(task.isCompleted());
            params.add(task.getId());
            params.add(task.getGroupId());

            template.update(sql, params.toArray());

            return ResponseEntity.ok("Task updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update task.");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask (@PathVariable int id) {
        String sql = "DELETE FROM Task WHERE Id=?";
        int rowsAffected = template.update(sql, id);

        if (rowsAffected > 0) {
            return ResponseEntity.ok("Task deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
