package com.hoaxify.ws.user.validation;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import com.hoaxify.ws.file.FileService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FileTypeValidator implements ConstraintValidator<FileType, String> {

    @Autowired
    FileService fileService;

    String[] types;

    @Override
    public void initialize(FileType constraintAnnotation) {
        this.types = constraintAnnotation.types();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value == null || value.isEmpty()) return true;
        String type = fileService.detectType(value);
        for(String validType : types) {
            if(type.contains(validType)) return true;
        }

        String validTypes = Arrays.stream(types).collect(Collectors.joining(", "));
        context.disableDefaultConstraintViolation();
        HibernateConstraintValidatorContext hibernateConstraintValidatorContext= context.unwrap(HibernateConstraintValidatorContext.class);
        hibernateConstraintValidatorContext.addMessageParameter("types", validTypes);
        hibernateConstraintValidatorContext.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate()).addConstraintViolation();
        return false;
    }
    
}

