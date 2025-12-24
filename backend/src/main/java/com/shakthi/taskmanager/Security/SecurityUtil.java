package com.shakthi.taskmanager.Security;

import com.shakthi.taskmanager.Exception.UnauthorizedActionException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    public static String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new UnauthorizedActionException("Unauthenticated request");
        }
        return auth.getName();
    }

}
