package com.example.base2.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String fullName;
    private String phone;
    private String description;
    private LocalDate createdDate;
    private LocalDate updatedTime;
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY)
    private List<Content> contents;

}
