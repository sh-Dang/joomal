package com.joomal.domain.member.controller;

import com.joomal.domain.ingredient.enumtype.Type;
import com.joomal.domain.member.dto.MemberIngredientResponseDto;
import com.joomal.domain.member.dto.MemberResponseDto;
import com.joomal.domain.member.service.MemberIngredientService;
import com.joomal.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberIngredientService memberIngredientService;

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyInfo(Authentication authentication) {
        log.debug("컨트롤러의 getMyInfo 메서드에 진입했습니다.");

        // 1. accessToken에서 추출한 member_id
        Long memberId = Long.valueOf(authentication.getName());

        // 2. 추출한 member_id로 DB의 member 조회해서 해당 member의 정보를 프론트엔드에 응답
        return ResponseEntity.ok(memberService.getMember(memberId));
    }

    // 내가 가진 재료를 불러오는 메서드
    @GetMapping("/me/ingredients")
    public List<MemberIngredientResponseDto> getMyIngredient(
            Authentication authentication,
            @RequestParam(required = false) Type type
    ){
        log.debug("컨트롤러의 내가 가진 재료를 불러오는 메서드에 진입했습니다.");

        // 1. accessToken에서 추출한 member_id
        Long memberId = Long.valueOf(authentication.getName());

        // 2. 추출한 member_id로 DB의 memberIngredient를 조회해서 해당 정보를 프론트엔드에 응답
        return memberIngredientService.getMemberIngredient(memberId, type);
    }

    @PostMapping("/me/ingredients/{id}")
    public ResponseEntity<Void> addToMyIngredient(
            Authentication authentication,
            @PathVariable("id") Long ingredientId
    ) {
        log.debug("나의 술장고에 재료를 추가하는 메서드에 진입했습니다.");
//        accessToken에서 추출한 member_id
        Long memberId = Long.valueOf(authentication.getName());

        memberIngredientService.addToMyIngredient(
                memberId,
                ingredientId
        );

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me/ingredients/{id}")
    public ResponseEntity<Void> deleteMyIngredient(
            Authentication authentication,
            @PathVariable("id") Long ingredientId
    ) {
        log.debug("재료삭제 메서드에 진입했습니다.");
//        accessToken에서 추출한 member_id
        Long memberId = Long.valueOf(authentication.getName());

        memberIngredientService.deleteMyIngredient(
                memberId,
                ingredientId
        );

        return ResponseEntity.ok().build();
    }

}
