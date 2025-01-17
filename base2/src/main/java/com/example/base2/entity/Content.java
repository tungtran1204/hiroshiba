package com.example.base2.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String brief;
    private LocalDate createdDate;
    private LocalDate updatedTime;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST )
    @JoinColumn(name = "author_id")
    @JsonIgnore
    private Account account;
}
