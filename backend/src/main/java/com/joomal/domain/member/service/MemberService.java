package com.joomal.domain.member.service;

import com.joomal.auth.dto.request.SocialLoginRequestDto;
import com.joomal.domain.member.entity.Member;
import com.joomal.domain.member.enumtype.Role;
import com.joomal.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Member createMember(){
        Member member = new Member();
        String nickname;
        do {
            nickname = "user" +
                    ThreadLocalRandom.current().nextInt(100000, 999999);
        } while (memberRepository.existsByNickname(nickname));
        member.setNickname(nickname);
        member.setRole(Role.USER);
        // TODO : 추후 이미지 추가, 변경 기능 구현
//        member.setProfileImage("");
        return memberRepository.save(member);
    }

    public Optional<Member> findById(Long id) {
        return memberRepository.findById(id);
    }

}
