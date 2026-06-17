package com.joomal.domain.member.repository;

import com.joomal.domain.member.entity.MemberIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberIngredientRepository extends JpaRepository<MemberIngredient, Long> {
    List<MemberIngredient> findByMemberId(Long memberId);
}