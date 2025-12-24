package com.shakthi.taskmanager.Service.impl;

import com.shakthi.taskmanager.Exception.ResourceNotFoundException;
import com.shakthi.taskmanager.Exception.UnauthorizedActionException;
import com.shakthi.taskmanager.Model.Task;
import com.shakthi.taskmanager.Model.User;
import com.shakthi.taskmanager.Repository.TaskRepository;
import com.shakthi.taskmanager.Repository.UserRepository;
import com.shakthi.taskmanager.Security.SecurityUtil;
import com.shakthi.taskmanager.Service.ActivityService;
import com.shakthi.taskmanager.Service.TaskService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ActivityService activityService;

    public TaskServiceImpl(
            TaskRepository taskRepository,
            UserRepository userRepository,
            ActivityService activityService
    ) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.activityService = activityService;
    }

    @Override
    public Task createTask(Task task) {
        String username = SecurityUtil.getCurrentUsername();

        User creator = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        task.setCreatedBy(creator);
        Task saved = taskRepository.save(task);

        activityService.logActivity("TASK_CREATED", saved, creator);

        return saved;
    }

    @Override
    public Task updateTask(Long taskId, String title, String description) {

        try {
            String username = SecurityUtil.getCurrentUsername();
            System.out.println("UPDATE TASK — USERNAME = " + username);

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("USER NOT FOUND"));

            Task task = taskRepository.findById(taskId)
                    .orElseThrow(() -> new RuntimeException("TASK NOT FOUND"));

            boolean isCreator = task.getCreatedBy().getId().equals(user.getId());
            boolean isAdmin = user.getRole().equals("ADMIN");

            System.out.println("IS CREATOR = " + isCreator);
            System.out.println("IS ADMIN = " + isAdmin);

            if (!isCreator && !isAdmin) {
                throw new UnauthorizedActionException("Not authorized to update this task");
            }

            if (title != null && !title.isBlank()) {
                task.setTitle(title);
            }

            if (description != null) {
                task.setDescription(description);
            }

            task.setUpdatedAt(LocalDateTime.now());

            Task updated = taskRepository.save(task);

            updated.getCreatedBy().getUsername();

            activityService.logActivity("TASK_UPDATED", updated, user);

            System.out.println("TASK UPDATED SUCCESSFULLY");

            return updated;

        } catch (Exception e) {
            System.err.println("ERROR DURING TASK UPDATE");
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public Task getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        String username = SecurityUtil.getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        boolean isCreator = task.getCreatedBy().getId().equals(user.getId());
        boolean isAdmin = user.getRole().equals("ADMIN");

        if (!isCreator && !isAdmin) {
            throw new UnauthorizedActionException("Not authorized to view task");
        }

        return task;
    }

    @Override
    public List<Task> getTasksVisibleToMe() {
        String username = SecurityUtil.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Task> created =
                taskRepository.findByCreatedByIdAndDeletedAtIsNull(user.getId());

        List<Task> assigned =
                taskRepository.findDistinctByAssignmentsUserIdAndDeletedAtIsNull(user.getId());

        return Stream.concat(created.stream(), assigned.stream())
                .distinct()
                .toList();
    }

    @Override
    public List<Task> getMyTasks() {
        String username = SecurityUtil.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return taskRepository.findByCreatedByIdAndDeletedAtIsNull(user.getId());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<Task> getAllTasks() {
        return taskRepository.findByDeletedAtIsNull();
    }

    @Override
    public void deleteTask(Long taskId) {
        String username = SecurityUtil.getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getCreatedBy().getId().equals(user.getId())
                && !user.getRole().equals("ADMIN")) {
            throw new UnauthorizedActionException("Not authorized to delete this task");
        }

        task.setDeletedAt(LocalDateTime.now());
        taskRepository.save(task);
    }
}
