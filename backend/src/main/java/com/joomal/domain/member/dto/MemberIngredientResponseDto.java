package com.joomal.domain.member.dto;

import com.joomal.domain.ingredient.entity.Ingredient;
import com.joomal.domain.member.entity.MemberIngredient;

public record MemberIngredientResponseDto(
        Long id,
        String ingredientKorName,
        String ingredientEngName,
        String imageUrl

) {

    public static MemberIngredientResponseDto from(MemberIngredient entity) {
        Ingredient ingredient = entity.getIngredient();

        return new MemberIngredientResponseDto(
                ingredient.getId(),
                ingredient.getKorName(),
                ingredient.getEngName(),
                ingredient.getImageUrl()
        );
    }
}
