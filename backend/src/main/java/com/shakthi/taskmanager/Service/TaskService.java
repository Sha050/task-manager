package com.shakthi.taskmanager.Service;

import com.shakthi.taskmanager.Model.Task;

import java.util.List;

public interface TaskService {

    Task createTask(Task task);

    Task updateTask(Long taskId, String title, String description);

    List<Task> getMyTasks();

    List<Task> getAllTasks();

    void deleteTask(Long taskId);

    Task getTaskById(Long taskId);

    List<Task> getTasksVisibleToMe();
}
