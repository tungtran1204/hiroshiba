package com.example.base2.au.AU_01;

import com.example.base2.entity.Account;
import com.example.base2.security.Jwt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/unistock/au_01")
public class AU_01_Controller {
    private final AU_01_Service au01Service;
    private final Jwt jwtUtil;

    public AU_01_Controller(AU_01_Service au01Service, Jwt jwtUtil) {
        this.au01Service = au01Service;
        this.jwtUtil = jwtUtil;
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AU_01_DTO request) {
        try {
            Account account = au01Service.loadUserByEmail(request.getEmail());

            if (!request.getPassword().equals(account.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            // Tạo JWT token với id người dùng
            String token = jwtUtil.generateToken(account.getId());
            return ResponseEntity.ok(new AU_01_DTO(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }
}
