package com.joomal.search.service;

import com.joomal.domain.cocktail.entity.Cocktail;
import com.joomal.domain.cocktail.repository.CocktailRepository;
import com.joomal.domain.cocktail.repository.RecipeIngredientRepository;
import com.joomal.domain.ingredient.entity.Ingredient;
import com.joomal.domain.ingredient.enumtype.Type;
import com.joomal.domain.ingredient.repository.IngredientRepository;
import com.joomal.search.dto.SearchResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    // 검색에 필요한 DB에 접근하는 Repository 주입
    private final CocktailRepository cocktailRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;

    /**
     * 키워드로 칵테일 및 재료를 통합 검색
     * 재료는 Type에 따라 LIQUOR와 INGREDIENT로 분리하여 반환
     *
     * @return 칵테일, 주류, 재료 검색 결과를 담은 SearchResponseDto (Dto에 상세 주석)
     */
    public SearchResponseDto search(String keyword) {
        // 1. 키워드가 포함된 칵테일 검색 (한글명 / 영문명 모두 검색)
        List<SearchResponseDto.CocktailResult> cocktails = cocktailRepository
                .findByKorNameContainingIgnoreCaseOrEngNameContainingIgnoreCase(keyword, keyword)
                .stream()
                .map(this::toCocktailResult)
                .toList();

        // 2. 키워드가 포함된 재료 전체 검색 (한글명 / 영문명 모두 검색)
        List<Ingredient> matchedIngredients = ingredientRepository
                .findByKorNameContainingIgnoreCaseOrEngNameContainingIgnoreCase(keyword, keyword);

        // 3. 검색된 재료를 Type별로 분리 (LIQUOR: 주류, INGREDIENT: 부재료)
        // ingredient를 조회 후 type을 조회하여 LIQUOR인 객체들을 Dto로 매핑하여 toINgredientResult(Dto)로 매핑
        // LIQUOR은 liquors라는 List<>객체에 담아 따로 보관
        List<SearchResponseDto.IngredientResult> liquors = matchedIngredients.stream()
                .filter(i -> i.getType() == Type.LIQUOR)
                .map(this::toIngredientResult)
                .toList();

        // 같은 방법으로 Type이 INGREDIENT인 객체들은
        // ingredients라는 List<>객체에 담아 따로 보관
        List<SearchResponseDto.IngredientResult> ingredients = matchedIngredients.stream()
                .filter(i -> i.getType() == Type.INGREDIENT)
                .map(this::toIngredientResult)
                .toList();

        // 생성된 List<?>들을 하나의 큰 ResponseDto에 매핑하여 반환해주는 로직
        return SearchResponseDto.builder()
                .cocktails(cocktails)
                .liquors(liquors)
                .ingredients(ingredients)
                .build();
    }

    /**
     * 조회된 Ingredient 엔티티를 IngredientResult DTO로 변환하는 메서드
     * 해당 재료가 사용된 관련 칵테일 목록을 함께 조회하여 포함한다.
     *
     * @param ingredient Dto로 변환할 Ingredient 엔티티
     * @return 관련 칵테일 목록이 포함된 IngredientResult DTO
     */
    private SearchResponseDto.IngredientResult toIngredientResult(Ingredient ingredient) {
        // 해당 재료가 포함된 레시피를 통해 관련 칵테일 목록 조회
        // ingredient table의 pk를 이용해 해당 pk가 들어가는 cocktail을 조회할 메서드
        // 검색된 Cocktail을 조회하여 CocktailResult(Dto)로 만든 List<>또한 반환해준다
        List<SearchResponseDto.CocktailResult> relatedCocktails = recipeIngredientRepository
                .findByIngredientId(ingredient.getId())
                .stream()
                .map(ri -> toCocktailResult(ri.getCocktail()))
                .toList();

        return SearchResponseDto.IngredientResult.builder()
                .id(ingredient.getId())
                .korName(ingredient.getKorName())
                .engName(ingredient.getEngName())
                .imageUrl(ingredient.getImageUrl())
                .type(ingredient.getType())
                .relatedCocktails(relatedCocktails)
                .build();
    }

    /**
     * Cocktail 엔티티를 CocktailResult DTO로 변환
     * 칵테일을 검색하거나 재료검색 시 해당 재료가 포함된(재료를 필요로하는) 칵테일을 검색하는데 사용되는 메서드
     *
     * @param cocktail Dto로 변환할 Cocktail 엔티티
     * @return CocktailResult DTO
     */
    private SearchResponseDto.CocktailResult toCocktailResult(Cocktail cocktail) {
        return SearchResponseDto.CocktailResult.builder()
                .id(cocktail.getId())
                .korName(cocktail.getKorName())
                .engName(cocktail.getEngName())
                .description(cocktail.getDescription())
                .imageUrl(cocktail.getImageUrl())
                .abv(cocktail.getAbv())
                .build();
    }
}