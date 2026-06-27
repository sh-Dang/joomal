package com.joomal.domain.cocktail.repository;

import com.joomal.domain.cocktail.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
    // ID를 이용한 칵테일 상세 조회
    List<RecipeIngredient> findByCocktailId(Long id);
    // 특정 재료 ID가 포함된 레시피 목록 조회 (해당 재료가 들어간 칵테일 탐색용)
    List<RecipeIngredient> findByIngredientId(Long ingredientId);
}
