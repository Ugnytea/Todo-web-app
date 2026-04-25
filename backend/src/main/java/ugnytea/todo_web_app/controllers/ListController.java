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

    @GetMapping("/list/{id}")
    public ResponseEntity<TaskList> getList(@PathVariable int id) {
        try {
            String sql = "SELECT * FROM TaskList  WHERE Id=?;";
            TaskList list = template.queryForObject(sql, new BeanPropertyRowMapper<>(TaskList.class), new Object[]{id});

            return ResponseEntity.ok(list);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<TaskList>> getAllLists() {
        try {
            String sql = "SELECT * FROM TaskList ORDER BY Name;";
            List<TaskList> lists = template.query(sql, new BeanPropertyRowMapper<>(TaskList.class));

            return ResponseEntity.ok(lists);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createList(@RequestBody TaskList list) {
        try {
            String sql = "INSERT INTO TaskList (Name) VALUES (?);";
            template.update(sql, list.getName());

            return ResponseEntity.ok("List created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create list.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateList(@RequestBody TaskList list) {
        try {
            String sql = "UPDATE TaskList SET Name=? WHERE Id=?;";

            ArrayList<Object> params = new ArrayList<>();
            params.add(list.getName());
            params.add(list.getId());

            template.update(sql, params.toArray());

            return ResponseEntity.ok("List updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update list.");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteList(@PathVariable int id) {
        String sql = "DELETE FROM TaskList WHERE Id=?;";
        int rowsAffected = template.update(sql, id);

        if (rowsAffected > 0) {
            return ResponseEntity.ok("List deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
