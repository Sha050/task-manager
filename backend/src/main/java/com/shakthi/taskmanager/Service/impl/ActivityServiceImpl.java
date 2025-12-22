package com.shakthi.taskmanager.Service.impl;

import com.shakthi.taskmanager.DTO.ActivityResponseDTO;
import com.shakthi.taskmanager.Model.Activity;
import com.shakthi.taskmanager.Model.Task;
import com.shakthi.taskmanager.Model.User;
import com.shakthi.taskmanager.Repository.ActivityRepository;
import com.shakthi.taskmanager.Service.ActivityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityServiceImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public void logActivity(String action, Task task, User actor) {
        Activity activity = new Activity();
        activity.setAction(action);
        activity.setTask(task);
        activity.setActor(actor);
        activityRepository.save(activity);
    }

    @Override
    public List<ActivityResponseDTO> getActivityForTask(Long taskId) {
        return activityRepository.findByTaskIdOrderByCreatedAtDesc(taskId)
                .stream()
                .map(a -> new ActivityResponseDTO(
                        a.getActor().getUsername(),
                        a.getAction(),
                        a.getCreatedAt()
                ))
                .toList();
    }
}
