package com.joomal.domain.member.service;

import com.joomal.domain.cocktail.entity.Cocktail;
import com.joomal.domain.cocktail.repository.CocktailRepository;
import com.joomal.domain.ingredient.entity.Ingredient;
import com.joomal.domain.ingredient.repository.IngredientRepository;
import com.joomal.domain.member.dto.FavoriteResponseDto;
import com.joomal.domain.member.entity.Favorite;
import com.joomal.domain.member.enumtype.FavoriteType;
import com.joomal.domain.member.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final CocktailRepository cocktailRepository;
    private final IngredientRepository ingredientRepository;

    public List<FavoriteResponseDto> getFavorites(Long memberId) {

        // memberId로 favoriteTable을 조회하는 메서드
        List<Favorite> favorites = favoriteRepository.findAllByMemberId(memberId);

        return favorites.stream()
                .map(this::toDto)
                .toList();
    }

    private FavoriteResponseDto toDto(Favorite favorite) {

        if (favorite.getTargetType() == FavoriteType.COCKTAIL) {

            Cocktail cocktail = cocktailRepository.findById(
                    favorite.getTargetId()
            ).orElseThrow(() ->
                    new IllegalArgumentException("칵테일이 존재하지 않습니다."));

            return FavoriteResponseDto.builder()
                    .favoriteType(FavoriteType.COCKTAIL)
                    .targetId(cocktail.getId())
                    .engName(cocktail.getEngName())
                    .korName(cocktail.getKorName())
                    .imageUrl(cocktail.getImageUrl())
                    .build();
        }

        Ingredient ingredient = ingredientRepository.findById(
                favorite.getTargetId()
        ).orElseThrow(() ->
                new IllegalArgumentException("재료가 존재하지 않습니다."));

        return FavoriteResponseDto.builder()
                .favoriteType(FavoriteType.INGREDIENT)
                .targetId(ingredient.getId())
                .engName(ingredient.getEngName())
                .korName(ingredient.getKorName())
                .imageUrl(ingredient.getImageUrl())
                .build();
    }
}
