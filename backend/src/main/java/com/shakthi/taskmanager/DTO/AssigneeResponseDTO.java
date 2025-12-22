package com.shakthi.taskmanager.DTO;

import java.time.LocalDateTime;

public class AssigneeResponseDTO {

    private Long userId;
    private String username;
    private LocalDateTime assignedAt;

    public AssigneeResponseDTO(Long userId, String username, LocalDateTime assignedAt) {
        this.userId = userId;
        this.username = username;
        this.assignedAt = assignedAt;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }
}
