package com.joomal.domain.member.enumtype;

public enum SocialProvider {
    GOOGLE,
    NAVER,
    KAKAO;

    // ENUM 사용을 위한 UpperCase 통일 메서드
    public static SocialProvider from(String provider) {
        return switch (provider.toLowerCase()) {
            case "google" -> GOOGLE;
            case "kakao" -> KAKAO;
            case "naver" -> NAVER;
            default -> throw new IllegalArgumentException(
                    "지원하지 않는 Provider: " + provider);
        };
    }
}
