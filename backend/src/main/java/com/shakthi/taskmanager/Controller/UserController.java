package com.shakthi.taskmanager.Controller;

import com.shakthi.taskmanager.DTO.LoginRequestDTO;
import com.shakthi.taskmanager.DTO.LoginResponseDTO;
import com.shakthi.taskmanager.DTO.UserResponseDTO;
import com.shakthi.taskmanager.DTO.UserSummaryDTO;
import com.shakthi.taskmanager.Model.User;
import com.shakthi.taskmanager.Service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody User user) {
        UserResponseDTO savedUser = userService.registerUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        LoginResponseDTO response = userService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public List<UserSummaryDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/search")
    public List<UserSummaryDTO> searchUsers(@RequestParam String query) {
        return userService.searchUsers(query);
    }

    @GetMapping("/me")
    public UserResponseDTO getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        return userService.getByUsername(username);
    }

}
