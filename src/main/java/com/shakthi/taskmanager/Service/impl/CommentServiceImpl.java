package com.shakthi.taskmanager.Service.impl;

import com.shakthi.taskmanager.Model.Comment;
import com.shakthi.taskmanager.Model.Task;
import com.shakthi.taskmanager.Model.User;
import com.shakthi.taskmanager.Repository.CommentRepository;
import com.shakthi.taskmanager.Repository.TaskAssignmentRepository;
import com.shakthi.taskmanager.Repository.TaskRepository;
import com.shakthi.taskmanager.Repository.UserRepository;
import com.shakthi.taskmanager.Security.SecurityUtil;
import com.shakthi.taskmanager.Service.CommentService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final TaskAssignmentRepository assignmentRepository;
    private final UserRepository userRepository;

    public CommentServiceImpl(
            CommentRepository commentRepository,
            TaskRepository taskRepository,
            TaskAssignmentRepository assignmentRepository,
            UserRepository userRepository
    ) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.assignmentRepository = assignmentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Comment addComment(Long taskId, String content) {

        User user = getCurrentUser();
        Task task = getTask(taskId);

        if (!isAssigned(taskId, user) && !isAdmin(user)) {
            throw new RuntimeException("Not authorized to comment on this task");
        }

        Comment comment = new Comment();
        comment.setTask(task);
        comment.setAuthor(user);
        comment.setContent(content);

        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsForTask(Long taskId) {

        User user = getCurrentUser();
        Task task = getTask(taskId);

        if (!isAssigned(taskId, user) && !isAdmin(user)) {
            throw new RuntimeException("Not authorized to view comments");
        }

        return commentRepository.findByTaskIdOrderByCreatedAtAsc(taskId);
    }

    @Override
    public Comment editComment(Long commentId, String newContent) {

        User user = getCurrentUser();

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getAuthor().getId().equals(user.getId()) && !isAdmin(user)) {
            throw new RuntimeException("Not authorized to edit this comment");
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
            throw new RuntimeException("Only admin can delete comments");
        }

        commentRepository.deleteById(commentId);
    }

    private User getCurrentUser() {
        String username = SecurityUtil.getCurrentUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Task getTask(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
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
