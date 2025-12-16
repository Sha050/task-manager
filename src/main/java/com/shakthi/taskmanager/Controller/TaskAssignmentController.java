package com.shakthi.taskmanager.Controller;

import com.shakthi.taskmanager.Model.TaskAssignment;
import com.shakthi.taskmanager.Model.enums.TaskStatus;
import com.shakthi.taskmanager.Service.TaskAssignmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public List<TaskAssignment> getAssignments(@PathVariable Long taskId) {
        return assignmentService.getAssignmentsForTask(taskId);
    }

    @PatchMapping("/{taskId}/status")
    public void updateStatus(
            @PathVariable Long taskId,
            @RequestParam TaskStatus status
    ) {
        assignmentService.updateMyTaskStatus(taskId, status);
    }
}
