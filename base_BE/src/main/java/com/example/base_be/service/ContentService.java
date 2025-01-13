package com.example.base_be.service;

import com.example.base_be.model.dto.ContentDto;

public interface ContentService {
    ContentDto createContent(ContentDto contentDto);
    ContentDto getContentById(Long contentId);
    ContentDto updateContent(Long contentId, ContentDto contentDto);
    void deleteContent(Long contentId);

}
