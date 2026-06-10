package com.joomal.domain.ingredient.controller;

import com.joomal.domain.ingredient.service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ingredients")
@RequiredArgsConstructor
public class IngredientController {
    // 서비스 주입
    private final IngredientService ingredientService;

}
