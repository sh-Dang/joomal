package com.joomal.domain.member.service;

import com.joomal.domain.member.dto.MemberResponseDto;
import com.joomal.domain.member.entity.Member;
import com.joomal.domain.member.enumtype.Role;
import com.joomal.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    // 임의로 할당된 닉네임을 가지고 member를 생성해서 social_account와 관계매핑을 해주는 메서드
    public Member createMember(){
        Member member = new Member();
        String nickname;
        do {
            nickname = "user" +
                    ThreadLocalRandom.current().nextInt(100000, 999999);
        } while (memberRepository.existsByNickname(nickname));
        member.setNickname(nickname);
        member.setRole(Role.USER); // default USER로 설정하여 DB 저장
        // TODO : 추후 이미지 추가, 변경 기능 구현
        member.setProfileImage("http://localhost:9999/images/default_image.png");
        return memberRepository.save(member);
    }

    // 유저 정보를 반환하는 메서드
    public MemberResponseDto getMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));

        // 찾아낸 member정보를 responseDto에 매핑하여 전달
        MemberResponseDto memberResponseDto = new MemberResponseDto(
                member.getNickname(),
                member.getProfileImage()
        );

        return memberResponseDto;
    }
}
