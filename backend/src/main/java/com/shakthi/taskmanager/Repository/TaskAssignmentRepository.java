package com.shakthi.taskmanager.Repository;

import com.shakthi.taskmanager.Model.TaskAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskAssignmentRepository extends JpaRepository<TaskAssignment, Long> {

    List<TaskAssignment> findByUserId(Long userId);

    Optional<TaskAssignment> findByTaskIdAndUserId(Long taskId, Long userId);
}
