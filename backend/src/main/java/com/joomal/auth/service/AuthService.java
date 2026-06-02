package com.joomal.auth.service;

import com.joomal.domain.member.entity.Member;
import com.joomal.domain.member.entity.SocialAccount;
import com.joomal.domain.member.repository.SocialAccountRepository;
import com.joomal.domain.member.service.MemberService;
import com.joomal.domain.member.service.SocialAccountService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.security.Provider;
import java.util.Optional;
import java.util.OptionalInt;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final SocialAccountService socialAccountService;
    private final MemberService memberService;

    // 로그인 요청시 일하게 될 메서드
    public void login(OAuth2User user){
        String providerId =
                user.getAttribute("sub"); // sub 추출

        String email =
                user.getAttribute("email"); // email 추출

        String name =
                user.getAttribute("name"); // name 추출 (필요없는 경우 코드 삭제하기)

        Optional<Member> member = memberService.findByEmail(email);

        // TODO : socialAccount를 사용 할 수 있도록 조회하기 (현재는 Null로 하드코딩)
        // 프론트엔드에서 뭐를 보내주는지 조회해야 함
        Provider provider = null;
        Optional<SocialAccount> socialAccount = socialAccountService.findByProviderAndProviderId(provider, providerId);

        if(member.isEmpty()){ // 가입된 회원이 아닌경우
            log.debug("최초가입 회원입니다. 데이터 저장 후 로그인을 완료합니다.");

            //TODO : Member테이블과 SocialAccount Table에 데이터 저장하여 서비스 회원임을 식별하게끔 하기
        }else{ // 이미 존재하는 회원인 경우
            log.debug("이미 존재하는 회원입니다. \n 로그인을 완료합니다.");
        }
    }

}
