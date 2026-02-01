package ugnytea.todo_web_app.module;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.springframework.data.annotation.Id;

@JsonPropertyOrder({"id", "name"})
public class TaskList {
    @Id
    private int id;
    private String name;

    public TaskList() {
    }

    public TaskList(int id) {
        this.id = id;
    }

    public TaskList(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "TaskList{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
