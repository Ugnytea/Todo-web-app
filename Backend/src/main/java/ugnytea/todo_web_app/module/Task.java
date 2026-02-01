package ugnytea.todo_web_app.module;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

@JsonPropertyOrder({"id", "title", "description", "createdAt", "dueTill", "important", "completed", "groupId"})
public class Task {
    @Id
    private int id;
    private String title;
    private String description;
    private LocalDate createdAt;
    private LocalDateTime dueTill;
    private boolean important;
    private boolean completed;
    private Integer groupId;


    public Task() {
    }

    public Task(int id) {
        this.id = id;
    }

    public Task(String title, String description, LocalDate createdAt, LocalDateTime dueTill, boolean important, boolean completed, Integer groupId) {
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.dueTill = dueTill;
        this.important = important;
        this.completed = completed;
        this.groupId = groupId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getDueTill() {
        return dueTill;
    }

    public void setDueTill(LocalDateTime dueTill) {
        this.dueTill = dueTill;
    }

    public boolean isImportant() {
        return important;
    }

    public void setImportant(boolean important) {
        this.important = important;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", dueTill=" + dueTill +
                ", important=" + important +
                ", completed=" + completed +
                ", groupId=" + groupId +
                '}';
    }
}
