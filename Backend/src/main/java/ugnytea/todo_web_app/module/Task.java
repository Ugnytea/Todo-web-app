package ugnytea.todo_web_app.module;

import org.springframework.data.annotation.Id;

import java.sql.Date;
import java.time.LocalDateTime;

public class Task {
    @Id
    private int id;
    private String title;
    private String description;
    private Date createdAt;
    private LocalDateTime dueTill;
    private boolean important;
    private boolean completed;
    private Integer groupId;


    public Task() {
    }

    public Task(int id) {
        this.id = id;
    }

    public Task(String title, String description, Date createdAt, LocalDateTime dueTill, boolean important, boolean completed, Integer groupId) {
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
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
