package com.hoaxify.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.hoaxify.ws.shared.Messages;

public class NotFoundException extends RuntimeException {
    
    public NotFoundException(long id){
        super(Messages.getMessageForLocale("hoaxify.user.not.found", LocaleContextHolder.getLocale(), id));
    }
}
