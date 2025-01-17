package com.example.base2.au.AU_02;

import com.example.base2.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AU_02_Repository extends JpaRepository<Account, Long> {
    boolean existsByEmail(String email);
}
