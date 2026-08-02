package ugnytea.todo_web_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import ugnytea.todo_web_app.module.Task;
import ugnytea.todo_web_app.module.TaskList;
import ugnytea.todo_web_app.module.TaskWithGroup;

import java.util.*;

@RestController
@RequestMapping("api/todos")
public class TodoController {
    @Autowired
    JdbcTemplate template;

    @GetMapping("/task/{id}")
    public ResponseEntity<TaskWithGroup> getTask (@PathVariable int id) {
        try {
            String sql = "SELECT t.*, l.Name as groupName FROM Task t LEFT JOIN TaskList l ON t.Group_id = l.Id WHERE t.Id=?;";
            TaskWithGroup task = template.queryForObject(sql, new BeanPropertyRowMapper<>(TaskWithGroup.class), new Object[]{id});

            return ResponseEntity.ok(task);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<TaskWithGroup>> getAllTasks () {
        try {
            String sql = "SELECT t.*, l.Name as groupName FROM Task t LEFT JOIN TaskList l ON t.Group_id = l.Id ORDER BY Completed, Important DESC, Due_till NULLS LAST, Created_at;";
            List<TaskWithGroup> tasks = template.query(sql, new BeanPropertyRowMapper<>(TaskWithGroup.class));

            return ResponseEntity.ok(tasks);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/groupOfTasks/{id}")
    public ResponseEntity<List<TaskWithGroup>> getGroupOfTasks(@PathVariable int id) {
        try {
            String sql = "SELECT t.*, l.Name as groupName FROM Task t LEFT JOIN TaskList l ON t.Group_id = l.Id WHERE Group_id=? ORDER BY Completed, Important DESC, Due_till NULLS LAST, Created_at;";
            List<TaskWithGroup> tasks = template.query(sql, new BeanPropertyRowMapper<>(TaskWithGroup.class), new Object[]{id});

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
            values = values.concat(", ?, ?);");
            params.add(task.isImportant());
            params.add(task.isCompleted());

            sql = sql.concat(values);

            template.update(sql, params.toArray());

            return ResponseEntity.ok("Task created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create task.");
        }

    }

    @PutMapping("/update")
    public ResponseEntity<String> updateTask (@RequestBody Task task) {
        try {
            String sql = "UPDATE Task SET Title=?, Description=?, Due_till=?, Important=?, Completed=?, Group_id=? WHERE Id=?;";
            ArrayList<Object> params = new ArrayList<>();

            params.add(task.getTitle());
            params.add(task.getDescription());
            params.add(task.getDueTill());
            params.add(task.isImportant());
            params.add(task.isCompleted());
            params.add(task.getGroupId());
            params.add(task.getId());

            template.update(sql, params.toArray());

            return ResponseEntity.ok("Task updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update task.");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask (@PathVariable int id) {
        String sql = "DELETE FROM Task WHERE Id=?;";
        int rowsAffected = template.update(sql, id);

        if (rowsAffected > 0) {
            return ResponseEntity.ok("Task deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteGroupOfTasks/{id}")
    public ResponseEntity<String> deleteGroupOfTasks (@PathVariable int id) {
        String sql = "DELETE FROM Task WHERE Group_id=?;";
        int rowsAffected = template.update(sql, id);

        if (rowsAffected > 0) {
            return ResponseEntity.ok("Tasks deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
