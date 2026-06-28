package com.joomal.search.dto;

import com.joomal.domain.ingredient.enumtype.Type;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

/**
 * 통합 검색 결과를 반환하는 응답 DTO.
 * 키워드 검색 결과로 매칭된 칵테일, 주류, 재료 목록을 포함
 * <p>
 * 반환 JSON 형태 예시
 *{
 *   "cocktails": [
 *     {
 *       "id": 1,
 *       "korName": "모히또"
 *     },
 *     {
 *       "id": 2,
 *       "korName": "마티니"
 *     }
 *   ],
 *   "liquors": [
 *     {
 *       "id": 3,
 *       "korName": "화이트 럼"
 *     }
 *   ],
 *   "ingredients": [
 *     {
 *       "id": 10,
 *       "korName": "탄산수"
 *     },
 *     {
 *       "id": 11,
 *       "korName": "설탕"
 *     }
 *   ]
 * }
 */
@Getter
@Builder
public class SearchResponseDto {

    // 검색된 칵테일 목록
    private List<CocktailResult> cocktails;
    // 검색된 주류 목록
    private List<IngredientResult> liquors;
    // 검색된 재료 목록
    private List<IngredientResult> ingredients;

    // 검색된 칵테일들 정보를 담는 Dto inner class
    @Getter
    @Builder
    public static class CocktailResult {
        private Long id;
        private String korName;
        private String engName;
        private String description;
        private String imageUrl;
        private BigDecimal abv;
    }

    // 검색된 재료 및 주류 정보를 담는 Dto inner class
    @Getter
    @Builder
    public static class IngredientResult {
        private Long id;
        private String korName;
        private String engName;
        private String imageUrl;
        private Type type;
        private List<CocktailResult> relatedCocktails;
    }
}
