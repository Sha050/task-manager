package com.shakthi.taskmanager.Repository;


import com.shakthi.taskmanager.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findByUsernameContainingIgnoreCase(String query);
    Optional<User> findByEmail(String email);
}
