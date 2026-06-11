package com.joomal.domain.ingredient.controller;

import com.joomal.domain.ingredient.dto.IngredientResponseDto;
import com.joomal.domain.ingredient.enumtype.Type;
import com.joomal.domain.ingredient.service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
@RequiredArgsConstructor
public class IngredientController {
    // 서비스 주입
    private final IngredientService ingredientService;

    @GetMapping
    public List<IngredientResponseDto> getIngredients(
            @RequestParam(required = false) Type type) { // /api/ingredients?type=aaaa 요청을 매핑해주는 어노테이션

        return ingredientService.getIngredients(type);
    }
}
