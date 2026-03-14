package ugnytea.todo_web_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ugnytea.todo_web_app.module.Task;
import ugnytea.todo_web_app.module.TaskWithGroup;

import java.util.List;

@RestController
@RequestMapping("api/specificTasks")
public class SpecificTaskController {
    @Autowired
    JdbcTemplate template;

    @GetMapping("/todays")
    public ResponseEntity<List<TaskWithGroup>> getTodaysTask () {
        try {
            String sql = "SELECT t.*, l.Name as groupName FROM Task t JOIN TaskList l ON t.Group_id = l.Id WHERE t.Due_till = CURRENT_DATE;";
            List<TaskWithGroup> task = template.query(sql, new BeanPropertyRowMapper<>(TaskWithGroup.class));

            return ResponseEntity.ok(task);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<TaskWithGroup>> getUpcomingTasks () {
        try {
            String sql = "SELECT t.*, l.Name as groupName FROM Task t JOIN TaskList l ON t.Group_id = l.Id WHERE t.Due_till BETWEEN CURRENT_DATE AND DATEADD('DAY', 7, CURRENT_DATE);";
            List<TaskWithGroup> task = template.query(sql, new BeanPropertyRowMapper<>(TaskWithGroup.class));

            return ResponseEntity.ok(task);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/important")
    public ResponseEntity<List<TaskWithGroup>> getImportantTasks () {
        try {
            String sql = "SELECT t.*, l.Name as groupName FROM Task t JOIN TaskList l ON t.Group_id = l.Id WHERE t.important;";
            List<TaskWithGroup> task = template.query(sql, new BeanPropertyRowMapper<>(TaskWithGroup.class));

            return ResponseEntity.ok(task);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
