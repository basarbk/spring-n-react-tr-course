package com.hoaxify.ws.user.dto;

import com.hoaxify.ws.user.validation.FileType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdate(
    @NotBlank(message = "{hoaxify.constraint.username.notblank}")
    @Size(min = 4, max=255)
    String username,

    @FileType(types = {"jpeg", "png"})
    String image
) {
    
}
