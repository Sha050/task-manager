package com.shakthi.taskmanager.Repository;

import com.shakthi.taskmanager.Model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByTaskIdOrderByCreatedAtDesc(Long taskId);
}
