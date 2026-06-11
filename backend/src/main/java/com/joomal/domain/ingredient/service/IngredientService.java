package com.joomal.domain.ingredient.service;

import com.joomal.domain.ingredient.dto.IngredientResponseDto;
import com.joomal.domain.ingredient.entity.Ingredient;
import com.joomal.domain.ingredient.enumtype.Type;
import com.joomal.domain.ingredient.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredientService {
    // 레포 주입
    private final IngredientRepository ingredientRepository;

    public List<IngredientResponseDto> getIngredients(Type type) {
        // repo에서 반환받아서 dto에 매핑해 줄 객체를 담을 변수
        List<Ingredient> ingredients;

        if (type == null) {
            ingredients = ingredientRepository.findAll();
        } else {
            ingredients = ingredientRepository.findByType(type);
        }
        return ingredients.stream()
                .map(IngredientResponseDto::from)
                .toList();
    }
}
