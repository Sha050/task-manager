package com.shakthi.taskmanager.DTO;

import com.shakthi.taskmanager.Model.enums.TaskStatus;

import java.time.LocalDateTime;

public class AssigneeResponseDTO {

    private Long userId;
    private String username;
    private TaskStatus status;
    private LocalDateTime assignedAt;

    public AssigneeResponseDTO(
            Long userId,
            String username,
            TaskStatus status,
            LocalDateTime assignedAt
    ) {
        this.userId = userId;
        this.username = username;
        this.status = status;
        this.assignedAt = assignedAt;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }
}
