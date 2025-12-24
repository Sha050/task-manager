package com.shakthi.taskmanager.Repository;

import com.shakthi.taskmanager.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByDeletedAtIsNull();
    List<Task> findDistinctByAssignmentsUserIdAndDeletedAtIsNull(Long userId);
    List<Task> findByCreatedByIdAndDeletedAtIsNull(Long userId);
}
