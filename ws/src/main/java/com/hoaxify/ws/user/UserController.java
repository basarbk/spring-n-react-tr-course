package com.hoaxify.ws.user;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @PostMapping("/api/v1/users")
    void createUser(){}
    
}
