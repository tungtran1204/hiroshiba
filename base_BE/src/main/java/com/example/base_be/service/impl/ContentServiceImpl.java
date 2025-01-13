package com.example.base_be.service.impl;

import com.example.base_be.exception.ResourceNotFoundException;
import com.example.base_be.model.dto.ContentDto;
import com.example.base_be.model.entities.Content;
import com.example.base_be.model.entities.Member;
import com.example.base_be.respository.ContentRepository;
import com.example.base_be.respository.MemberRepository;
import com.example.base_be.service.ContentService;
import com.example.base_be.service.mapper.ContentMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ContentServiceImpl implements ContentService {

    private final ContentRepository contentRepository;
    private final MemberRepository memberRepository;
    private final ContentMapper contentMapper;

    public ContentServiceImpl(ContentRepository contentRepository, MemberRepository memberRepository, ContentMapper contentMapper) {
        this.contentRepository = contentRepository;
        this.memberRepository = memberRepository;
        this.contentMapper = contentMapper;
    }

    public ContentDto createContent(ContentDto contentDto) {
        // Kiểm tra xem Member có tồn tại không
        Optional<Member> memberOptional = memberRepository.findById(contentDto.getMemberId()); // Sử dụng getMemberId() thay vì getMemberId().getId()
        if (memberOptional.isEmpty()) {
            throw new IllegalArgumentException("Member with ID " + contentDto.getMemberId() + " does not exist.");
        }

        // Tạo đối tượng Content từ ContentDto bằng mapper
        Content content = contentMapper.toEntity(contentDto);
        content.setCreatedDate(LocalDate.now());
        content.setUpdatedTime(LocalDate.now());
        content.setMember(memberOptional.get()); // Gán đối tượng Member cho Content

        // Lưu Content vào cơ sở dữ liệu
        Content savedContent = contentRepository.save(content);

        // Trả về ContentDto từ đối tượng Content đã lưu bằng mapper
        return contentMapper.toDTO(savedContent);
    }

    @Override
    public ContentDto getContentById(Long contentId) {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with id: " + contentId));
        return contentMapper.toDTO(content); // Hàm chuyển đổi Entity sang DTO
    }

    @Override
    public ContentDto updateContent(Long contentId, ContentDto contentDto) {
        // Tìm content hiện tại theo id
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with id: " + contentId));

        // Cập nhật các trường từ contentDto
        content.setTitle(contentDto.getTitle());
        content.setBrief(contentDto.getBrief());
        content.setCreatedDate(LocalDate.now());

        // Lưu thay đổi vào cơ sở dữ liệu
        Content updatedContent = contentRepository.save(content);

        return contentMapper.toDTO(updatedContent); // Trả về DTO của nội dung đã cập nhật
    }

    @Override
    public void deleteContent(Long contentId) {
        // Kiểm tra xem content có tồn tại không
        if (!contentRepository.existsById(contentId)) {
            throw new ResourceNotFoundException("Content not found with id: " + contentId);
        }

        // Xóa nội dung
        contentRepository.deleteById(contentId);
    }


}
