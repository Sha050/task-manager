package com.shakthi.taskmanager.Service;

import com.shakthi.taskmanager.DTO.AssigneeResponseDTO;
import com.shakthi.taskmanager.Model.TaskAssignment;
import com.shakthi.taskmanager.Model.enums.TaskStatus;

import java.util.List;

public interface TaskAssignmentService {

    void assignUserToTask(Long taskId, Long userId);

    List<TaskAssignment> getAssignmentsForTask(Long taskId);

    void updateMyTaskStatus(Long taskId, TaskStatus status);

    List<AssigneeResponseDTO> getAssigneesForTask(Long taskId);

    void assignMe(Long taskId);

    void assignUser(Long taskId, Long userId);

}
