package com.joomal.domain.member.controller;

import com.joomal.domain.member.dto.MemberResponseDto;
import com.joomal.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;
//    private final ObjectMapper objectMapper;

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyInfo(Authentication authentication) {
        log.debug("멤버 컨트롤러의 겟마이인포 메서드에 진입했습니다.");
//        String email = authentication.getName();
//        log.debug("가져온 user의 정보:{}", email);

        // 1. accessToken에서 추출한 member_id
        Long memberId =
                Long.valueOf(authentication.getName());

        // TODO : 2. 추출한 member_id로 DB의 member 조회
        // DTO에 매핑
        MemberResponseDto member = null;

        return ResponseEntity.ok(member);
    }

}
