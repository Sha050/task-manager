package com.shakthi.taskmanager.Service;

import com.shakthi.taskmanager.Model.Task;

import java.util.List;

public interface TaskService {

    Task createTask(Task task);

    List<Task> getMyTasks();

    List<Task> getAllTasks(); // ADMIN only

    void deleteTask(Long taskId);
}
