package com.joomal.domain.member.repository;

import com.joomal.domain.ingredient.enumtype.Type;
import com.joomal.domain.member.entity.MemberIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberIngredientRepository extends JpaRepository<MemberIngredient, Long> {
    List<MemberIngredient> findByMemberId(Long memberId);

    @Modifying
    @Query(value = """
        INSERT INTO member_ingredient(member_id, ingredient_id)
        VALUES (:memberId, :ingredientId)
        """, nativeQuery = true)
    void saveMemberIngredient(
            @Param("memberId") Long memberId,
            @Param("ingredientId") Long ingredientId
    );

    @Modifying
    @Query(value = """
        DELETE FROM member_ingredient
        WHERE member_id = :memberId AND ingredient_id = :ingredientId
        """, nativeQuery = true)
    void deleteMemberIngredient(
            @Param("memberId") Long memberId,
            @Param("ingredientId") Long ingredientId
    );

    // 사용자가 이미 보유한 재료인지 판별하는 메서드
    // 존재하면 true, 존재하지 않으면 false 반환
    boolean existsByMemberIdAndIngredientId(
            Long memberId,
            Long ingredientId
    );

    // Type이 들어오지 않으면 null, 들어오면 해당하는 값으로 조회하는 쿼리
    @Query("""
        SELECT mi
        FROM MemberIngredient mi
        JOIN FETCH mi.ingredient i
        WHERE mi.member.id = :memberId
        AND (:type IS NULL OR i.type = :type)
    """)
    List<MemberIngredient> findByMemberIdAndIngredientType(
            @Param("memberId") Long memberId,
            @Param("type") Type type
    );
}