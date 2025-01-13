package com.example.base_be.service.mapper;


import com.example.base_be.model.dto.ContentDto;
import com.example.base_be.model.entities.Content;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ContentMapper {

    @Mapping(source = "member.id", target = "memberId")
    ContentDto toDTO(Content content);

    @Mapping(source = "memberId", target = "member.id")
    Content toEntity(ContentDto contentDto);
}

