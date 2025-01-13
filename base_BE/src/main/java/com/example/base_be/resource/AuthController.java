package com.example.base_be.resource;

import com.example.base_be.model.dto.LoginRequest;
import com.example.base_be.model.dto.LoginResponse;
import com.example.base_be.model.dto.RegisterMemberDto;
import com.example.base_be.model.entities.Member;
import com.example.base_be.service.MemberService;
import com.example.base_be.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    public AuthController(MemberService memberService, JwtUtil jwtUtil) {
        this.memberService = memberService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterMemberDto userDto) {
        if (memberService.existsByEmail(userDto.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        Member registeredMember = memberService.registerUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredMember);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Member member = memberService.loadUserByEmail(request.getEmail());

            if (!request.getPassword().equals(member.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            // Tạo JWT token với id người dùng
            String token = jwtUtil.generateToken(member.getId());
            return ResponseEntity.ok(new LoginResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Authenticated successfully!");
    }
}
