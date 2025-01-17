package com.example.base2.au.AU_01;

import com.example.base2.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AU_01_Repository extends JpaRepository<Account, Long> {
    Optional<Account> findByEmail(String email);
}
