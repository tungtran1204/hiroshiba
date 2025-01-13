package com.example.base_be.service;


import com.example.base_be.model.dto.RegisterMemberDto;
import com.example.base_be.model.entities.Member;

public interface MemberService {
    Member registerUser(RegisterMemberDto userDto);

    boolean existsByEmail(String email);

    Member loadUserByEmail(String email);

    Member authenticateByEmail(String email, String password);

    Member getMemberById(Long id);

    Member updateMember(Member member);
}
