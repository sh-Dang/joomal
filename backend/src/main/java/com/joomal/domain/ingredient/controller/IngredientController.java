package com.joomal.domain.ingredient.controller;

import com.joomal.domain.cocktail.dto.CocktailDetailResponseDto;
import com.joomal.domain.ingredient.dto.IngredientDetailResponseDto;
import com.joomal.domain.ingredient.dto.IngredientResponseDto;
import com.joomal.domain.ingredient.enumtype.Type;
import com.joomal.domain.ingredient.service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
@RequiredArgsConstructor
public class IngredientController {
    // 서비스 주입
    private final IngredientService ingredientService;

    @GetMapping
    public List<IngredientResponseDto> getIngredients(
            // /api/ingredients?type=aaaa 요청을 매핑해주는 어노테이션
            // value에 key값을 지정해줌으로써 프론트엔드와 통신의 일관성을 확보할 수 있음
            @RequestParam(value = "type", required = false) Type type) {
        return ingredientService.getIngredients(type);
    }

    // id를 담아서 service에 요청하는 controller 메서드
    @GetMapping("/{id}")
    public ResponseEntity<IngredientDetailResponseDto> getIngredient(@PathVariable Long id) {
        return ResponseEntity.ok(ingredientService.getIngredient(id));
    }
}
