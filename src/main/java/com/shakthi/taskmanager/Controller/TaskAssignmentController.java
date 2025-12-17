package com.shakthi.taskmanager.Controller;

import com.shakthi.taskmanager.DTO.TaskAssignmentResponse;
import com.shakthi.taskmanager.Model.TaskAssignment;
import com.shakthi.taskmanager.Model.enums.TaskStatus;
import com.shakthi.taskmanager.Service.TaskAssignmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskAssignmentController {

    private final TaskAssignmentService assignmentService;

    public TaskAssignmentController(TaskAssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping("/{taskId}/assign/{userId}")
    public void assignUser(
            @PathVariable Long taskId,
            @PathVariable Long userId
    ) {
        assignmentService.assignUserToTask(taskId, userId);
    }

    @GetMapping("/{taskId}/assignments")
    public List<TaskAssignmentResponse> getAssignments(@PathVariable Long taskId) {
        return assignmentService.getAssignmentsForTask(taskId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @PatchMapping("/{taskId}/status")
    public void updateStatus(
            @PathVariable Long taskId,
            @RequestParam TaskStatus status
    ) {
        assignmentService.updateMyTaskStatus(taskId, status);
    }

    private TaskAssignmentResponse toResponse(TaskAssignment assignment) {
        TaskAssignmentResponse dto = new TaskAssignmentResponse();
        dto.setUsername(assignment.getUser().getUsername());
        dto.setStatus(assignment.getStatus());
        dto.setAssignedAt(assignment.getAssignedAt());
        dto.setCompletedAt(assignment.getCompletedAt());
        return dto;
    }
}
