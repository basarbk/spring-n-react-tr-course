package com.hoaxify.ws.error;

import java.util.stream.Collectors;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hoaxify.ws.auth.exception.AuthenticationException;
import com.hoaxify.ws.shared.Messages;
import com.hoaxify.ws.user.exception.ActivationNotificationException;
import com.hoaxify.ws.user.exception.InvalidTokenException;
import com.hoaxify.ws.user.exception.NotFoundException;
import com.hoaxify.ws.user.exception.NotUniqueEmailException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler({
        MethodArgumentNotValidException.class,
        NotUniqueEmailException.class,
        ActivationNotificationException.class,
        InvalidTokenException.class,
        NotFoundException.class,
        AuthenticationException.class,
    })
    ResponseEntity<ApiError> handleException(Exception exception, HttpServletRequest request){
        ApiError apiError = new ApiError();
        apiError.setPath(request.getRequestURI());
        apiError.setMessage(exception.getMessage());
        if(exception instanceof MethodArgumentNotValidException) {
            String message = Messages.getMessageForLocale("hoaxify.error.validation", LocaleContextHolder.getLocale());
            apiError.setMessage(message);
            apiError.setStatus(400);
            var validationErrors = ((MethodArgumentNotValidException)exception).getBindingResult().getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (existing, replacing) -> existing));
            apiError.setValidationErrors(validationErrors);
        } else if (exception instanceof NotUniqueEmailException) {
            apiError.setStatus(400);
            apiError.setValidationErrors(((NotUniqueEmailException)exception).getValidationErrors());
        } else if (exception instanceof ActivationNotificationException) {
            apiError.setStatus(502);
        } else if (exception instanceof InvalidTokenException) {
            apiError.setStatus(400);
        } else if (exception instanceof NotFoundException) {
            apiError.setStatus(404);
        } else if (exception instanceof AuthenticationException) {
            apiError.setStatus(401);
        }

        return ResponseEntity.status(apiError.getStatus()).body(apiError);
    }
    
}
