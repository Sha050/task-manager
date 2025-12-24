package com.shakthi.taskmanager.Service.impl;

import com.shakthi.taskmanager.DTO.LoginRequestDTO;
import com.shakthi.taskmanager.DTO.LoginResponseDTO;
import com.shakthi.taskmanager.DTO.UserResponseDTO;
import com.shakthi.taskmanager.DTO.UserSummaryDTO;
import com.shakthi.taskmanager.Model.User;
import com.shakthi.taskmanager.Repository.UserRepository;
import com.shakthi.taskmanager.Service.UserService;
import com.shakthi.taskmanager.Exception.BadRequestException;
import com.shakthi.taskmanager.Exception.ResourceNotFoundException;
import com.shakthi.taskmanager.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseDTO getByUsername(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());

        return dto;
    }


    @Override
    public UserResponseDTO registerUser(User user) {

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new BadRequestException("Username already exists");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(savedUser.getId());
        dto.setUsername(savedUser.getUsername());
        dto.setEmail(savedUser.getEmail());
        dto.setRole(savedUser.getRole());
        dto.setCreatedAt(savedUser.getCreatedAt());

        return dto;
    }

    @Override
    public List<UserSummaryDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserSummaryDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getRole()
                ))
                .toList();
    }

    @Override
    public List<UserSummaryDTO> searchUsers(String query) {
        return userRepository.findByUsernameContainingIgnoreCase(query)
                .stream()
                .map(user -> new UserSummaryDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getRole()
                ))
                .toList();
    }


    @Override
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid username or password"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid username or password");
        }

        String token = JwtUtil.generateToken(
                user.getId(),
                user.getUsername(),
                user.getRole()
        );

        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());

        return response;
    }
}
