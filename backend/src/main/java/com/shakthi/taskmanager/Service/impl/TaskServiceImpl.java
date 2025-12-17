package com.shakthi.taskmanager.Service.impl;

import com.shakthi.taskmanager.Model.Task;
import com.shakthi.taskmanager.Model.User;
import com.shakthi.taskmanager.Repository.TaskRepository;
import com.shakthi.taskmanager.Repository.UserRepository;
import com.shakthi.taskmanager.Security.SecurityUtil;
import com.shakthi.taskmanager.Service.TaskService;
import com.shakthi.taskmanager.Exception.ResourceNotFoundException;
import com.shakthi.taskmanager.Exception.UnauthorizedActionException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskServiceImpl(TaskRepository taskRepository,
                           UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Task createTask(Task task) {
        String username = SecurityUtil.getCurrentUsername();

        User creator = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        task.setCreatedBy(creator);
        return taskRepository.save(task);
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
