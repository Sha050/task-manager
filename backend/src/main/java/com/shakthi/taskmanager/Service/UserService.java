package com.shakthi.taskmanager.Service;

import com.shakthi.taskmanager.DTO.LoginRequestDTO;
import com.shakthi.taskmanager.DTO.LoginResponseDTO;
import com.shakthi.taskmanager.DTO.UserResponseDTO;
import com.shakthi.taskmanager.DTO.UserSummaryDTO;
import com.shakthi.taskmanager.Model.User;

import java.util.List;

public interface UserService {
    UserResponseDTO registerUser(User user);
    LoginResponseDTO login(LoginRequestDTO loginRequest);
    List<UserSummaryDTO> getAllUsers();
    List<UserSummaryDTO> searchUsers(String query);
    UserResponseDTO getByUsername(String username);

}