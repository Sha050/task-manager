package com.shakthi.taskmanager.Service;

import com.shakthi.taskmanager.DTO.ActivityResponseDTO;
import com.shakthi.taskmanager.Model.Task;
import com.shakthi.taskmanager.Model.User;

import java.util.List;

public interface ActivityService {

    void logActivity(String action, Task task, User actor);
    List<ActivityResponseDTO> getActivityForTask(Long taskId);
}
