package com.shakthi.taskmanager.Service.impl;

import com.shakthi.taskmanager.Model.Task;
import com.shakthi.taskmanager.Model.TaskAssignment;
import com.shakthi.taskmanager.Model.User;
import com.shakthi.taskmanager.Model.enums.TaskStatus;
import com.shakthi.taskmanager.Repository.TaskAssignmentRepository;
import com.shakthi.taskmanager.Repository.TaskRepository;
import com.shakthi.taskmanager.Repository.UserRepository;
import com.shakthi.taskmanager.Security.SecurityUtil;
import com.shakthi.taskmanager.Service.TaskAssignmentService;
import com.shakthi.taskmanager.Exception.BadRequestException;
import com.shakthi.taskmanager.Exception.ResourceNotFoundException;
import com.shakthi.taskmanager.Exception.UnauthorizedActionException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskAssignmentServiceImpl implements TaskAssignmentService {

    private final TaskAssignmentRepository assignmentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskAssignmentServiceImpl(TaskAssignmentRepository assignmentRepository,
                                     TaskRepository taskRepository,
                                     UserRepository userRepository) {
        this.assignmentRepository = assignmentRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void assignUserToTask(Long taskId, Long userId) {

        String currentUsername = SecurityUtil.getCurrentUsername();
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getCreatedBy().getId().equals(currentUser.getId())
                && !currentUser.getRole().equals("ADMIN")) {
            throw new UnauthorizedActionException("Not authorized to assign users");
        }

        User assignee = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignee not found"));

        assignmentRepository.findByTaskIdAndUserId(taskId, userId)
                .ifPresent(a -> {
                    throw new BadRequestException("User already assigned to this task");
                });

        TaskAssignment assignment = new TaskAssignment();
        assignment.setTask(task);
        assignment.setUser(assignee);

        assignmentRepository.save(assignment);
    }

    @Override
    public List<TaskAssignment> getAssignmentsForTask(Long taskId) {

        String username = SecurityUtil.getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        boolean isAssigned = assignmentRepository
                .findByTaskIdAndUserId(taskId, user.getId())
                .isPresent();

        if (!isAssigned && !user.getRole().equals("ADMIN")) {
            throw new UnauthorizedActionException("Not authorized to view assignments");
        }

        return assignmentRepository.findAll()
                .stream()
                .filter(a -> a.getTask().getId().equals(taskId))
                .toList();
    }

    @Override
    public void updateMyTaskStatus(Long taskId, TaskStatus status) {

        String username = SecurityUtil.getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        TaskAssignment assignment = assignmentRepository
                .findByTaskIdAndUserId(taskId, user.getId())
                .orElseThrow(() ->
                        new UnauthorizedActionException("You are not assigned to this task"));

        assignment.setStatus(status);

        if (status == TaskStatus.DONE) {
            assignment.setCompletedAt(LocalDateTime.now());
        }

        assignmentRepository.save(assignment);
    }
}
