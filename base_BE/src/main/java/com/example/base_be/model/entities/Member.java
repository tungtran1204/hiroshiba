package com.example.base_be.model.entities;

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
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String phone;
    private String email;
    private String description;
    private LocalDate createdDate;
    private LocalDate updatedTime;
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Content> contents;

}
