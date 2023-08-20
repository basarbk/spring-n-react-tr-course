package com.hoaxify.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.auth.dto.AuthResponse;
import com.hoaxify.ws.auth.dto.Credentials;
import com.hoaxify.ws.auth.exception.AuthenticationException;
import com.hoaxify.ws.error.ApiError;

@RestController
public class AuthController {

    @Autowired
    AuthService authService;
    
    @PostMapping("/api/v1/auth")
    AuthResponse handleAuthentication(@RequestBody Credentials creds) {
        return authService.authenticate(creds);
    }

    @ExceptionHandler(AuthenticationException.class)
    ResponseEntity<?> handleAuthenticationException(AuthenticationException exception){
        ApiError error = new ApiError();
        error.setPath("/api/v1/auth");
        error.setStatus(401);
        error.setMessage(exception.getMessage());
        return ResponseEntity.status(401).body(error);
    }
}
