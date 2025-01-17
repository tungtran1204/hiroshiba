package com.example.base2.au.AU_02;

import com.example.base2.au.AU_01.AU_01_DTO;
import com.example.base2.entity.Account;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/unistock/au_02")
public class AU_02_Controller {
    private final AU_02_Service au02Service;

    public AU_02_Controller(AU_02_Service au02Service) {
        this.au02Service = au02Service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AU_02_DTO au02Dto) {
        if (au02Service.existsByEmail(au02Dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        Account registeredAccount = au02Service.registerUser(au02Dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredAccount);
    }
}
