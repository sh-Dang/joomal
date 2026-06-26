package com.joomal.domain.member.repository;

import com.joomal.domain.member.dto.FavoriteResponseDto;
import com.joomal.domain.member.entity.Favorite;
import com.joomal.domain.member.enumtype.FavoriteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByMemberId(Long memberId);
    List<Favorite> findByMemberIdAndTargetType(Long memberId, FavoriteType targetType);
    boolean existsByMemberIdAndTargetTypeAndTargetId(
            Long memberId,
            FavoriteType targetType,
            Long targetId
    );
}
