package com.example.base2.au.AU_02;

import com.example.base2.au.AU_01.AU_01_Repository;
import com.example.base2.entity.Account;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AU_02_Service {
    private final AU_02_Repository au02Repository;

    public AU_02_Service(AU_02_Repository au02Repository) {
        this.au02Repository = au02Repository;
    }


    public boolean existsByEmail(String email) {
        return au02Repository.existsByEmail(email);
    }

    public Account registerUser(AU_02_DTO au02Dto) {
        if (au02Repository.existsByEmail(au02Dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists!");
        }

        Account account = Account.builder()
                .email(au02Dto.getEmail())
                .password(au02Dto.getPassword())
                .createdDate(LocalDate.now())
                .build();

        return au02Repository.save(account);
    }
}
