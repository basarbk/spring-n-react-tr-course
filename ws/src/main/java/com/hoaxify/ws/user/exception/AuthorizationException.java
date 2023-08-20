package com.hoaxify.ws.user.exception;

public class AuthorizationException extends RuntimeException{
    
    public AuthorizationException(){
        super("Forbidden");
    }
}
