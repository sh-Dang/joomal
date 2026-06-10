package com.joomal.domain.ingredient.service;

import com.joomal.domain.ingredient.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IngredientService {
    // 레포 주입
    private final IngredientRepository ingredientRepository;
}
