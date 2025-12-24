package com.shakthi.taskmanager.Controller;

import com.shakthi.taskmanager.DTO.CreateTaskRequest;
import com.shakthi.taskmanager.DTO.TaskResponse;
import com.shakthi.taskmanager.DTO.UpdateTaskRequest;
import com.shakthi.taskmanager.Model.Task;
import com.shakthi.taskmanager.Service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public TaskResponse createTask(@RequestBody CreateTaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());

        Task saved = taskService.createTask(task);
        return toResponse(saved);
    }

    @PatchMapping("/{taskId}")
    public TaskResponse updateTask(
            @PathVariable Long taskId,
            @RequestBody UpdateTaskRequest request
    ) {
        Task updated = taskService.updateTask(
                taskId,
                request.getTitle(),
                request.getDescription()
        );
        return toResponse(updated);
    }

    @GetMapping("/visible")
    public List<TaskResponse> getVisibleTasks() {
        return taskService.getTasksVisibleToMe()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/me")
    public List<TaskResponse> getMyTasks() {
        return taskService.getMyTasks()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping
    public List<TaskResponse> getAllTasks() {
        return taskService.getAllTasks()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{taskId}")
    public TaskResponse getTaskById(@PathVariable Long taskId) {
        Task task = taskService.getTaskById(taskId);
        return toResponse(task);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
    }

    private TaskResponse toResponse(Task task) {
        TaskResponse dto = new TaskResponse();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setPriority(task.getPriority());
        dto.setDueDate(task.getDueDate());
        dto.setCreatedBy(task.getCreatedBy().getUsername());
        dto.setCreatedAt(task.getCreatedAt());
        return dto;
    }
}
