package com.joomal.domain.member.service;

import com.joomal.domain.ingredient.dto.IngredientResponseDto;
import com.joomal.domain.ingredient.entity.Ingredient;
import com.joomal.domain.member.dto.MemberIngredientResponseDto;
import com.joomal.domain.member.entity.MemberIngredient;
import com.joomal.domain.member.repository.MemberIngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberIngredientService {

    private final MemberIngredientRepository memberIngredientRepository;

    public List<MemberIngredientResponseDto> getMemberIngredient(Long memberId){

        List<MemberIngredient> memberIngredients =
                memberIngredientRepository.findByMemberId(memberId);

        return memberIngredients.stream()
                .map(MemberIngredientResponseDto::from)
                .toList();
    }
}
