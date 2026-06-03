package com.joomal.auth.service;

import com.joomal.auth.dto.request.SocialLoginRequestDto;
import com.joomal.domain.member.entity.Member;
import com.joomal.domain.member.entity.SocialAccount;
import com.joomal.domain.member.enumtype.SocialProvider;
import com.joomal.domain.member.service.MemberService;
import com.joomal.domain.member.service.SocialAccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final SocialAccountService socialAccountService;
    private final MemberService memberService;

    // 로그인 요청시 일하게 될 메서드
    public Optional<Member> login(SocialLoginRequestDto socialLoginRequestDto){
        String socialProvider = socialLoginRequestDto.socialProvider(); // sns 제공 플랫폼
        SocialProvider socialProviderEnum =
                SocialProvider.valueOf(socialProvider.toUpperCase()); // sns 제공플랫폼을 Enum으로 환
        String providerUserId = socialLoginRequestDto.providerUserId(); // sub 추출
        String email = socialLoginRequestDto.email(); //email 추출

        /**
         * 로그인 흐름 요약
         * 1. SocialAccount가 존재하는지 검증
         * 2-1. 존재하는 경우 : Member도 존재 할 것이므로 해당 SocialAccount와 1:1 매핑된 Member Entity 반환
         * 2-2. 존재하지 않는 경우 : MemberEntity 생성(insert) 후 SocialAccount Entity도 생성(insert) 후 Member Entity반환
         */
        Optional<SocialAccount> socialAccount =
                socialAccountService.findBySocialProviderAndProviderUserId(
                        socialProviderEnum,
                        providerUserId
                );

        // SocialAccount가 존재 = 서비스의 회원임
        if (socialAccount.isPresent()) {
            return Optional.of(socialAccount.get().getMember());
        }

        // 최초 가입 회원 처리
        Member member = memberService.createMember();

        socialAccountService.createSocialAccount(
                member,
                socialProvider,
                providerUserId,
                email
        );

        return Optional.of(member);
    }

}
