package com.joomal.domain.ingredient.repository;

import com.joomal.domain.ingredient.dto.IngredientResponseDto;
import com.joomal.domain.ingredient.entity.Ingredient;
import com.joomal.domain.ingredient.enumtype.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    // type을 기준(Liquor, Mixer)으로 ingredient를 검색하는 메서드
    List<Ingredient> findByType(Type type);
}
