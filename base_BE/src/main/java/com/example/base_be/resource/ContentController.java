package com.example.base_be.resource;

import com.example.base_be.model.dto.ContentDto;
import com.example.base_be.service.ContentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contents")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping
    public ResponseEntity<ContentDto> createContent(@RequestBody ContentDto contentDto) {
        try {
            ContentDto createdContent = contentService.createContent(contentDto);
            return new ResponseEntity<>(createdContent, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{contentId}")
    public ResponseEntity<ContentDto> updateContent(
            @PathVariable Long contentId,
            @RequestBody ContentDto contentDto) {
        try {
            ContentDto updatedContent = contentService.updateContent(contentId, contentDto);
            return new ResponseEntity<>(updatedContent, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{contentId}")
    public ResponseEntity<ContentDto> getContentById(@PathVariable Long contentId) {
        try {
            ContentDto content = contentService.getContentById(contentId);
            return new ResponseEntity<>(content, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{contentId}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long contentId) {
        try {
            contentService.deleteContent(contentId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
