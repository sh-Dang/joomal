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
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final CocktailRepository cocktailRepository;
    private final IngredientRepository ingredientRepository;

    public List<FavoriteResponseDto> getFavorites(Long memberId, FavoriteType type) {
        List<Favorite> favorites = (type != null)
                ? favoriteRepository.findByMemberIdAndTargetType(memberId, type)
                : favoriteRepository.findByMemberId(memberId);

        return favorites.stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    private FavoriteResponseDto toResponseDto(Favorite favorite) {
        return switch (favorite.getTargetType()) {

            // Ingredient 테이블에서 type 컬럼으로 INGREDIENT / LIQUOR 구분하므로 두 케이스 함께 처리
            case INGREDIENT, LIQUOR -> {
                Ingredient ingredient = ingredientRepository.findById(favorite.getTargetId())
                        .orElseThrow(() -> new NoSuchElementException("해당하는 재료가 존재하지 않습니다."));
                yield FavoriteResponseDto.builder()
                        .id(favorite.getId())                        // 즐겨찾기 고유 ID
                        .favoriteType(favorite.getTargetType())      // INGREDIENT or LIQUOR
                        .targetId(favorite.getTargetId())            // Ingredient PK
                        .engName(ingredient.getEngName())
                        .korName(ingredient.getKorName())
                        .imageUrl(ingredient.getImageUrl())
                        .build();
            }

            // Cocktail은 독립 엔티티이므로 별도 Repository에서 조회
            case COCKTAIL -> {
                Cocktail cocktail = cocktailRepository.findById(favorite.getTargetId())
                        .orElseThrow(() -> new NoSuchElementException("해당하는 칵테일이 존재하지 않습니다."));
                yield FavoriteResponseDto.builder()
                        .id(favorite.getId())                        // 즐겨찾기 고유 ID
                        .favoriteType(favorite.getTargetType())      // COCKTAIL
                        .targetId(favorite.getTargetId())            // Cocktail PK
                        .engName(cocktail.getEngName())
                        .korName(cocktail.getKorName())
                        .imageUrl(cocktail.getImageUrl())
                        .build();
            }
        };
    }
}
