package com.joomal.domain.member.repository;

import com.joomal.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    /* 닉네임 중복을 점검하기 위한 메서드
    JPA에서 자동으로 아래 쿼리를 수행해 줌
    SELECT EXISTS (
            SELECT 1
                    FROM member
                    WHERE nickname = ?
    ); */
    boolean existsByNickname(String nickname);
}
