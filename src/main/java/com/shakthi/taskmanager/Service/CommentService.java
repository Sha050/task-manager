package com.shakthi.taskmanager.Service;

import com.shakthi.taskmanager.Model.Comment;

import java.util.List;

public interface CommentService {

    Comment addComment(Long taskId, String content);

    List<Comment> getCommentsForTask(Long taskId);

    Comment editComment(Long commentId, String newContent);

    void deleteComment(Long commentId);
}
