package com.example.base_be.service.mapper;

import com.example.base_be.model.dto.MemberDto;
import com.example.base_be.model.entities.Member;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {

    // Tự động chuyển Member thành MemberDto
    MemberDto toDTO(Member member);

    // Tự động chuyển MemberDto thành Member
    Member toEntity(MemberDto memberDto);
}
