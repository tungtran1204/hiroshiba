package com.example.base_be.service.impl;

import com.example.base_be.model.dto.RegisterMemberDto;
import com.example.base_be.model.entities.Member;
import com.example.base_be.respository.MemberRepository;
import com.example.base_be.service.MemberService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public Member registerUser(RegisterMemberDto userDto) {
        if (memberRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("Email already exists!");
        }

        Member member = Member.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .createdDate(LocalDate.now())
                .build();

        return memberRepository.save(member);
    }

    @Override
    public boolean existsByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    @Override
    public Member loadUserByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }

    @Override
    public Member authenticateByEmail(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        if (!password.equals(member.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return member;
    }

    @Override
    public Member getMemberById(Long id) {
        return memberRepository.findById(id).orElse(null);
    }

    @Override
    public Member updateMember(Member member) {
        return memberRepository.save(member);
    }
}
