package com.shakthi.taskmanager.Service.impl;

import com.shakthi.taskmanager.Model.Comment;
import com.shakthi.taskmanager.Model.Task;
import com.shakthi.taskmanager.Model.User;
import com.shakthi.taskmanager.Repository.CommentRepository;
import com.shakthi.taskmanager.Repository.TaskAssignmentRepository;
import com.shakthi.taskmanager.Repository.TaskRepository;
import com.shakthi.taskmanager.Repository.UserRepository;
import com.shakthi.taskmanager.Security.SecurityUtil;
import com.shakthi.taskmanager.Service.ActivityService;
import com.shakthi.taskmanager.Service.CommentService;
import com.shakthi.taskmanager.Exception.ResourceNotFoundException;
import com.shakthi.taskmanager.Exception.UnauthorizedActionException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final TaskAssignmentRepository assignmentRepository;
    private final UserRepository userRepository;
    private final ActivityService activityService;

    public CommentServiceImpl(
            CommentRepository commentRepository,
            TaskRepository taskRepository,
            TaskAssignmentRepository assignmentRepository,
            UserRepository userRepository,
            ActivityService activityService
    ) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.assignmentRepository = assignmentRepository;
        this.userRepository = userRepository;
        this.activityService = activityService;
    }

    @Override
    public Comment addComment(Long taskId, String content) {

        User user = getCurrentUser();
        Task task = getTask(taskId);

        if (!isAssigned(taskId, user) && !isAdmin(user)) {
            throw new UnauthorizedActionException("Not authorized to comment on this task");
        }

        Comment comment = new Comment();
        comment.setTask(task);
        comment.setAuthor(user);
        comment.setContent(content);

        Comment savedComment = commentRepository.save(comment);

        activityService.logActivity("COMMENT_ADDED", task, user);

        return savedComment;
    }

    @Override
    public List<Comment> getCommentsForTask(Long taskId) {

        User user = getCurrentUser();
        Task task = getTask(taskId);

        boolean isCreator = task.getCreatedBy().getId().equals(user.getId());

        if (!isAssigned(taskId, user) && !isAdmin(user) && !isCreator) {
            throw new UnauthorizedActionException("Not authorized to view comments");
        }

        return commentRepository.findByTaskIdOrderByCreatedAtAsc(taskId);
    }

    @Override
    public Comment editComment(Long commentId, String newContent) {

        User user = getCurrentUser();

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));

        if (!comment.getAuthor().getId().equals(user.getId())
                && !isAdmin(user)) {
            throw new UnauthorizedActionException("Not authorized to edit this comment");
        }

        comment.setContent(newContent);
        comment.setEdited(true);
        comment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Long commentId) {

        User user = getCurrentUser();

        if (!isAdmin(user)) {
            throw new UnauthorizedActionException("Only admin can delete comments");
        }

        commentRepository.deleteById(commentId);
    }

    private User getCurrentUser() {
        String username = SecurityUtil.getCurrentUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Task getTask(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }

    private boolean isAssigned(Long taskId, User user) {
        return assignmentRepository
                .findByTaskIdAndUserId(taskId, user.getId())
                .isPresent();
    }

    private boolean isAdmin(User user) {
        return user.getRole().equals("ADMIN");
    }
}
