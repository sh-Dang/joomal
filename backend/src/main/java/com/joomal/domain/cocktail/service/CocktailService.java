package com.joomal.domain.cocktail.service;

import com.joomal.domain.cocktail.dto.CocktailDetailResponseDto;
import com.joomal.domain.cocktail.dto.CocktailResponseDto;
import com.joomal.domain.cocktail.entity.Cocktail;
import com.joomal.domain.cocktail.entity.RecipeIngredient;
import com.joomal.domain.cocktail.entity.RecipeStep;
import com.joomal.domain.cocktail.repository.CocktailRepository;
import com.joomal.domain.cocktail.repository.RecipeIngredientRepository;
import com.joomal.domain.cocktail.repository.RecipeStepRepository;
import com.joomal.domain.ingredient.entity.Ingredient;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@ToString
public class CocktailService {
    private final CocktailRepository cocktailRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final RecipeStepRepository recipeStepRepository;
    private final ObjectMapper objectMapper;

    /**
     * @return
     * [
     * {"abv":13.0,
     *  "description":"상쾌한 민트와 라임이 특징인 쿠바의 대표 칵테일"
     *  "engName":"Mojito"
     *  "glassType":"Highball",
     *  "id":1,
     *  "imageUrl":"/images/cocktails/mojito.jpg",
     *  "korName":"모히또"}
     * ]
     */
    public List<CocktailResponseDto> getAllCocktails() {
        List<CocktailResponseDto> cocktails = cocktailRepository.findAll()
                .stream()
                .map(CocktailResponseDto::from)
                .collect(Collectors.toList());

        log.debug("cocktails: {}", cocktails);
        return cocktails;
    }

    public CocktailDetailResponseDto getCocktail(Long id){

        Cocktail cocktail = cocktailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("칵테일이 존재하지 않습니다."));

        List<RecipeIngredient> ingredientResult =
                recipeIngredientRepository.findByCocktailId(id);

        List<RecipeStep> stepResult =
                recipeStepRepository.findByCocktailId(id);

        return new CocktailDetailResponseDto(
                cocktail.getId(),
                cocktail.getKorName(),
                cocktail.getEngName(),
                cocktail.getDescription(),
                cocktail.getImageUrl(),
                cocktail.getAbv(),
                cocktail.getGlassType(),
                ingredientResult,
                stepResult
        );
    }
}
