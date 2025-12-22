package com.shakthi.taskmanager.Controller;

import com.shakthi.taskmanager.DTO.ActivityResponseDTO;
import com.shakthi.taskmanager.Service.ActivityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/{taskId}/activity")
    public List<ActivityResponseDTO> getActivity(@PathVariable Long taskId) {
        return activityService.getActivityForTask(taskId);
    }
}
