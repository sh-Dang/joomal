package com.joomal.domain.ingredient.repository;

import com.joomal.domain.ingredient.dto.IngredientResponseDto;
import com.joomal.domain.ingredient.entity.Ingredient;
import com.joomal.domain.ingredient.enumtype.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    // type을 기준(Liquor, Ingredient)으로 ingredient를 검색하는 메서드
    List<Ingredient> findByType(Type type);

    // 한글 이름 또는 영문 이름에 키워드가 포함된 재료 목록 조회 (대소문자 무시)
    List<Ingredient> findByKorNameContainingIgnoreCaseOrEngNameContainingIgnoreCase(
            String korKeyword, String engKeyword
    );
}
