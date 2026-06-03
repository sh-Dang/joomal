package com.joomal.auth.dto.request;

// 불변객체를 편리하게 표현, 구현해주는 Record 클래스 사용
public record SocialLoginRequestDto(
        String socialProvider, // SNS 제공자
        // 절대 불변의 유저 식별자로 sub를 사용해 로그인 안정성을 높임
        String providerUserId, // SNS 제공자 Id(principal().getAttribute("sub");
        String email // email
//        String name
//        String profileImage
) {}
