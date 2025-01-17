package com.example.base2.security;

import org.springframework.stereotype.Component;

import java.util.Date;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.DecodingException;
import org.springframework.stereotype.Component;
@Component
public class Jwt {
    private static final String JWT_SECRET_KEY = "YWJjZGVmZ2hpamtsbW5vcHFyc3R1d2V4eXoqc29uZ2hhaWNr";
    private static final long JWT_EXPIRATION_TIME = 3600000; // 1 hour

    // Hàm để tạo JWT token
    public String generateToken(Long id) {
        return Jwts.builder()
                .setSubject(String.valueOf(id))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET_KEY)
                .compact();
    }

    // Hàm giải mã JWT token
    public Claims extractClaims(String token) {
        try {
            String fixedToken = fixBase64Url(token); // Sửa token nếu cần thiết
            return Jwts.parser()
                    .setSigningKey(JWT_SECRET_KEY)
                    .parseClaimsJws(fixedToken)
                    .getBody();
        } catch (DecodingException e) {
            throw new IllegalArgumentException("Invalid token format", e);
        }
    }

    // Hàm chuyển đổi base64url thành base64 chuẩn
    private String fixBase64Url(String base64Url) {
        return base64Url.replace('-', '+').replace('_', '/');
    }

    // Hàm lấy email từ token
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // Hàm kiểm tra token đã hết hạn chưa
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Hàm kiểm tra tính hợp lệ của token
    public boolean validateToken(String token, String email) {
        return (email.equals(extractEmail(token)) && !isTokenExpired(token));
    }
}
