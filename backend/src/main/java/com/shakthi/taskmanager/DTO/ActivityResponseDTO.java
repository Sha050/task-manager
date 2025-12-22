package com.shakthi.taskmanager.DTO;

import java.time.LocalDateTime;

public class ActivityResponseDTO {

    private String actor;
    private String action;
    private LocalDateTime timestamp;

    public ActivityResponseDTO(String actor, String action, LocalDateTime timestamp) {
        this.actor = actor;
        this.action = action;
        this.timestamp = timestamp;
    }

    public String getActor() {
        return actor;
    }

    public String getAction() {
        return action;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}
