package ugnytea.todo_web_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ugnytea.todo_web_app.Controllers.TodoController;
import ugnytea.todo_web_app.Module.Task;

import java.util.List;

@SpringBootApplication
public class TodoWebAppApplication implements CommandLineRunner {
    @Autowired
    TodoController todoController;

    public static void main(String[] args) {
        SpringApplication.run(TodoWebAppApplication.class, args);
    }

    @Override
    public void run(String... arg) throws Exception {
        Task t1 = new Task("Eat", "I  don't know", java.sql.Date.valueOf("2026-01-23"), null, false, false);
//        Task t2 = new Task("Do something", "I  don't know");
//        Task t3 = new Task("Third thing", "I  don't know");

        todoController.createTask(t1);
//        todoController.createTask(t2);
//        todoController.createTask(t3);
//
        System.out.println("3 Tasks created");
        List<Task> tasks = todoController.getAllTasks();
        for (Task task : tasks) {
            System.out.println(task);
        }
//
////        Task t1Updated = new Task(1, "Eat", "Eat mangoes");
////        todoController.updateTask(t1Updated);
//
//        System.out.println("First updated Task");
//        tasks = todoController.getAllTasks();
//        for (Task task : tasks) {
//            System.out.println(task);
//        }
//
//        Task t2Deleted = new Task(2);
//        todoController.deleteTask(t2Deleted);
//        System.out.println("2 deleted Task");
//        tasks = todoController.getAllTasks();
//        for (Task task : tasks) {
//            System.out.println(task);
//        }

    }
}
