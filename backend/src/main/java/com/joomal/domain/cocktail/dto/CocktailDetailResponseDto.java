package com.joomal.domain.cocktail.dto;

import com.joomal.domain.cocktail.entity.RecipeStep;
import com.joomal.domain.cocktail.entity.RecipeIngredient;

import java.util.List;

public record CocktailDetailResponseDto(
        Long id,
        String korName,
        String engName,
        String description,
        String imageUrl,
        java.math.BigDecimal abv,
        String glassType,
        List<RecipeIngredient> ingredients,
        List<RecipeStep> steps
) {
}