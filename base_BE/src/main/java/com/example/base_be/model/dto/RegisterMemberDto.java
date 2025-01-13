package com.example.base_be.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RegisterMemberDto {

    @NotBlank
    private String username;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

//    @Pattern(regexp = Regex.PASSWORD, message = Regex.PASSWORD_MESSAGE)
    private String password;

//    @Pattern(regexp = Regex.PASSWORD, message = Regex.PASSWORD_MESSAGE)
    private String confirmPassword;


}
