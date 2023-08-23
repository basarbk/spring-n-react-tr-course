package com.hoaxify.ws.user.dto;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PasswordUpdate(
  @Size(min=8, max=255)
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message="{hoaxify.constraint.password.pattern}")
  String password) {

}