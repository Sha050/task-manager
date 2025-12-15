package com.shakthi.taskmanager.Service;

import com.shakthi.taskmanager.DTO.LoginRequestDTO;
import com.shakthi.taskmanager.DTO.UserResponseDTO;
import com.shakthi.taskmanager.Model.User;

public interface UserService {
    UserResponseDTO registerUser(User user);
    UserResponseDTO login(LoginRequestDTO loginRequest);
}