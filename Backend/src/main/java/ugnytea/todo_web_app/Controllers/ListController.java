package ugnytea.todo_web_app.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ugnytea.todo_web_app.Module.TaskList;

import java.util.ArrayList;
import java.util.List;

//@RestController
//@RequestMapping("api/todos")
@Component
public class ListController {
    @Autowired
    JdbcTemplate template;

//    @PostConstruct
    public void createList(TaskList list) {
        String sql = "INSERT INTO TaskList (Name) VALUES (?)";

        template.update(sql, list.getName());
    }

    //    @PostConstruct
    public void updateList(TaskList list) {
        String sql = "UPDATE TaskList SET Name=? WHERE Id=?";

        ArrayList<Object> params = new ArrayList<>();
        params.add(list.getName());
        params.add(list.getId());

        template.update(sql, params);
    }

//    @GetMapping
    public List<TaskList> getAllLists() {
        String sql = "SELECT * FROM TaskList";
        var bprm = new BeanPropertyRowMapper<>(TaskList.class);

        return template.query(sql, bprm);
    }

//    @PostConstruct
    public void deleteList(TaskList list) {
        String sql = "DELETE FROM TaskList WHERE Id=?";
        template.update(sql, list.getId());
    }
}
