package com.joomal.domain.member.repository;

import com.joomal.domain.member.dto.FavoriteResponseDto;
import com.joomal.domain.member.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    // memberIf로 favorite을 조회하는 메서드
    List<Favorite> findAllByMemberId(Long memberId);
}
