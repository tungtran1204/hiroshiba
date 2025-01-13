package com.example.base_be.resource;

import com.example.base_be.model.entities.Content;
import com.example.base_be.model.entities.Member;
import com.example.base_be.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/members")
public class MemberController {

    @Autowired
    private MemberService memberService;  // Tiêm MemberService để lấy dữ liệu từ database

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable Long id) {
        // Lấy thông tin thành viên từ database thông qua service
        Member member = memberService.getMemberById(id);

        if (member == null) {
            throw new MemberNotFoundException("Member not found with id: " + id);  // Ném lỗi nếu không tìm thấy thành viên
        }
        return member;
    }

    @PutMapping("/{id}")
    public Member updateMember(@PathVariable Long id, @RequestBody Member updatedMember) {
        // Kiểm tra xem thành viên có tồn tại không
        Member existingMember = memberService.getMemberById(id);
        if (existingMember == null) {
            throw new MemberNotFoundException("Member not found with id: " + id);
        }

        // Cập nhật thông tin thành viên
        existingMember.setFirstName(updatedMember.getFirstName());
        existingMember.setLastName(updatedMember.getLastName());
        existingMember.setEmail(updatedMember.getEmail());
        existingMember.setPhone(updatedMember.getPhone());
        existingMember.setDescription(updatedMember.getDescription());

        // Lưu thay đổi vào database thông qua service
        return memberService.updateMember(existingMember);
    }


    // Xử lý lỗi nếu không tìm thấy thành viên
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(MemberNotFoundException.class)
    public String handleMemberNotFoundException(MemberNotFoundException ex) {
        return ex.getMessage();
    }

    // Exception class để xử lý lỗi khi không tìm thấy thành viên
    public static class MemberNotFoundException extends RuntimeException {
        public MemberNotFoundException(String message) {
            super(message);
        }
    }

    @GetMapping("/{id}/contents")
    public List<Content> getContent(@PathVariable Long id, @RequestParam(required = false) String search) {
        Member member = memberService.getMemberById(id);
        if (member == null) {
            throw new MemberNotFoundException("Member not found with id: " + id);
        }

        List<Content> contents = member.getContents();

        if (search != null && !search.isEmpty()) {
            // Tìm kiếm theo title hoặc brief
            contents = contents.stream()
                    .filter(content -> content.getTitle().contains(search) || content.getBrief().contains(search))  // Tìm kiếm theo title hoặc brief
                    .collect(Collectors.toList());
        }
        return contents;
    }
}
