package com.joomal.domain.ingredient.service;

import com.joomal.domain.ingredient.dto.IngredientDetailResponseDto;
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

    // 재료(주류) 상세페이지 요청을 컨트롤하는 메서드
    public IngredientDetailResponseDto getIngredient(Long id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 재료입니다."));

        return new IngredientDetailResponseDto(
                ingredient.getId(),
                ingredient.getKorName(),
                ingredient.getEngName(),
                ingredient.getImageUrl(),
                ingredient.getAbv(),
                ingredient.getDescription());
    }
}
