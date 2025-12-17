package com.shakthi.taskmanager.DTO;

import com.shakthi.taskmanager.Model.enums.TaskStatus;

import java.time.LocalDateTime;

public class TaskAssignmentResponse {

    private String username;
    private TaskStatus status;
    private LocalDateTime assignedAt;
    private LocalDateTime completedAt;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
