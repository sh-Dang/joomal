package com.joomal.domain.member.service;

import com.joomal.domain.cocktail.entity.Cocktail;
import com.joomal.domain.cocktail.repository.CocktailRepository;
import com.joomal.domain.ingredient.entity.Ingredient;
import com.joomal.domain.ingredient.repository.IngredientRepository;
import com.joomal.domain.member.dto.FavoriteResponseDto;
import com.joomal.domain.member.entity.Favorite;
import com.joomal.domain.member.entity.Member;
import com.joomal.domain.member.enumtype.FavoriteType;
import com.joomal.domain.member.repository.FavoriteRepository;
import jakarta.persistence.EntityManager;
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
    private final EntityManager entityManager;

    // 즐겨찾기 전체 조회 메서드
    public List<FavoriteResponseDto> getFavorites(Long memberId, FavoriteType type) {
        // 여기에 type이 ingredient, liquor일떄 분기 필요
        List<Favorite> favorites;

        if (type == null) {
            favorites = favoriteRepository.findByMemberId(memberId);

        } else if (type == FavoriteType.INGREDIENT) { // ingredient일때 ingredient의 ingredient조회
            favorites = favoriteRepository.findIngredientFavorites(memberId);

        } else if (type == FavoriteType.LIQUOR) { // liquor일때 ingredient의 liquor조회
            favorites = favoriteRepository.findLiquorFavorites(memberId);

        } else { // 현재는 Cocktail 일때
            favorites = favoriteRepository.findByMemberIdAndTargetType(memberId, type);
        }
        return favorites.stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    // 즐겨찾기 엔터티를 조회하여 응답 Dto로 변환해주는 메서드
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

    public Boolean isCocktailFavorite(Long memberId, Long targetId) {
        FavoriteType targetType = FavoriteType.valueOf("COCKTAIL");
        return favoriteRepository.existsByMemberIdAndTargetTypeAndTargetId(memberId, targetType, targetId);
    }

    public Boolean isIngredientFavorite(Long memberId, Long targetId) {
        FavoriteType targetType = FavoriteType.valueOf("INGREDIENT");
        return favoriteRepository.existsByMemberIdAndTargetTypeAndTargetId(memberId, targetType, targetId);
    }

    // 칵테일 즐겨찾기 추가
    public void addCocktailFavorite(Long memberId, Long targetId){

        // 즐겨찾기 타입 명시
        FavoriteType targetType = FavoriteType.COCKTAIL;

        // 이미 해당 회원이 같은 칵테일을 즐겨찾기 했는지 조회
        // (중복 insert 방지용 서비스 레벨 방어 로직)
        boolean exists = favoriteRepository
                .existsByMemberIdAndTargetTypeAndTargetId(memberId, targetType, targetId);

        // 존재하지 않는 경우
        if (!exists) {
            // Member 전체 조회 없이 참조만 가져옴
            Member memberRef = entityManager.getReference(Member.class, memberId);

            // Favorite 엔티티 생성
            Favorite favorite = new Favorite(memberRef, targetType, targetId);

            // DB 저장
            favoriteRepository.save(favorite);
        }
    }

    // 재료(ingredient) 즐겨찾기 추가
    public void addIngredientFavorite(Long memberId, Long targetId){

        // 즐겨찾기 타입 명시
        FavoriteType targetType = FavoriteType.INGREDIENT;

        // 동일한 즐겨찾기 중복 등록 방지
        boolean exists = favoriteRepository
                .existsByMemberIdAndTargetTypeAndTargetId(memberId, targetType, targetId);

        // 존재하지 않는 경우
        if (!exists) {
            // Member 전체 조회 없이 참조만 가져옴
            Member memberRef = entityManager.getReference(Member.class, memberId);

            // Favorite 엔티티 생성
            Favorite favorite = new Favorite(memberRef, targetType, targetId);

            // DB 저장
            favoriteRepository.save(favorite);
        }
    }

    public void deleteCocktailFavorite(Long memberId, Long targetId) {
        // 즐겨찾기 타입 명시
        FavoriteType targetType = FavoriteType.COCKTAIL;

        // 즐겨찾기에 존재하는지 우선 검증
        boolean exists = favoriteRepository
                .existsByMemberIdAndTargetTypeAndTargetId(memberId, targetType, targetId);

        // 존재할 경우
        if(exists){
            // DB에서 해당 엔터티 제거
            favoriteRepository.deleteByCondition(memberId, targetType, targetId);
        }

    }

    public void deleteIngredientFavorite(Long memberId, Long targetId) {
        // 즐겨찾기 타입 명시
        FavoriteType targetType = FavoriteType.INGREDIENT;

        // 즐겨찾기에 존재하는지 우선 검증
        boolean exists = favoriteRepository
                .existsByMemberIdAndTargetTypeAndTargetId(memberId, targetType, targetId);

        // 존재할 경우
        if(exists){
            // DB에서 해당 엔터티 제거
            favoriteRepository.deleteByCondition(memberId, targetType, targetId);
        }
    }
}
