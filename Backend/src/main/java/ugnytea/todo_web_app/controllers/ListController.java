package ugnytea.todo_web_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import ugnytea.todo_web_app.module.TaskList;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/todosLists")

public class ListController {
    @Autowired
    JdbcTemplate template;

    @GetMapping
    public ResponseEntity<List<TaskList>> getAllLists() {
        try {
            String sql = "SELECT * FROM TaskList";
            List<TaskList> lists = template.query(sql, new BeanPropertyRowMapper<>(TaskList.class));

            return ResponseEntity.ok(lists);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createList(@RequestBody TaskList list) {
        try {
            String sql = "INSERT INTO TaskList (Name) VALUES (?)";
            template.update(sql, list.getName());

            return ResponseEntity.ok("List created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create list.");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateList(@RequestBody TaskList list) {
        try {
            String sql = "UPDATE TaskList SET Name=? WHERE Id=?";

            ArrayList<Object> params = new ArrayList<>();
            params.add(list.getName());
            params.add(list.getId());

            template.update(sql, params);

            return ResponseEntity.ok("List updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update task.");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteList(@PathVariable int id) {
        String sql = "DELETE FROM TaskList WHERE Id=?";
        int rowsAffected = template.update(sql, id);

        if (rowsAffected > 0) {
            return ResponseEntity.ok("Task deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
