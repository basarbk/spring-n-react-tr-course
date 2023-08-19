package com.hoaxify.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.hoaxify.ws.shared.Messages;

public class InvalidTokenException extends RuntimeException{

    public InvalidTokenException(){
        super(Messages.getMessageForLocale("hoaxify.activate.user.invalid.token", LocaleContextHolder.getLocale()));
    }
    
}
