package com.example.base2.au.AU_01;

import com.example.base2.entity.Account;
import org.springframework.stereotype.Service;

@Service
public class AU_01_Service {
    private final AU_01_Repository au01Repository;

    public AU_01_Service(AU_01_Repository au01Repository) {
        this.au01Repository = au01Repository;
    }


    public Account loadUserByEmail(String email) {
        return au01Repository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }
}
