package com.shakthi.taskmanager.Controller;

import com.shakthi.taskmanager.DTO.CommentResponse;
import com.shakthi.taskmanager.DTO.CreateCommentRequest;
import com.shakthi.taskmanager.DTO.EditCommentRequest;
import com.shakthi.taskmanager.Model.Comment;
import com.shakthi.taskmanager.Service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/tasks/{taskId}/comments")
    public CommentResponse addComment(
            @PathVariable Long taskId,
            @RequestBody CreateCommentRequest request
    ) {
        Comment comment = commentService.addComment(taskId, request.getContent());
        return toResponse(comment);
    }

    @GetMapping("/tasks/{taskId}/comments")
    public List<CommentResponse> getComments(@PathVariable Long taskId) {
        return commentService.getCommentsForTask(taskId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @PutMapping("/comments/{commentId}")
    public CommentResponse editComment(
            @PathVariable Long commentId,
            @RequestBody EditCommentRequest request
    ) {
        Comment comment = commentService.editComment(commentId, request.getContent());
        return toResponse(comment);
    }

    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }

    private CommentResponse toResponse(Comment comment) {
        CommentResponse dto = new CommentResponse();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setEdited(comment.isEdited());
        dto.setAuthor(comment.getAuthor().getUsername());
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }
}
