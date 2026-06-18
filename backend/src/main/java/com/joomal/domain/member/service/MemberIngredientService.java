package com.joomal.domain.member.service;

import com.joomal.domain.member.dto.MemberIngredientResponseDto;
import com.joomal.domain.member.entity.MemberIngredient;
import com.joomal.domain.member.repository.MemberIngredientRepository;
import jakarta.transaction.Transactional;
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

        // 추출한 List<MemberIngredient>를 Dto List에 매핑
        return memberIngredients.stream()
                .map(MemberIngredientResponseDto::from)
                .toList();
    }

    @Transactional
    public void addToMyIngredient(Long memberId, Long ingredientId) {
        // 1. MemberIngredient Table에서 이미 가진 재료인지 아닌지 먼저 검증
        boolean exists =
                memberIngredientRepository.existsByMemberIdAndIngredientId(
                        memberId,
                        ingredientId
                );

        if (exists) {
            // 2. 등록된 재료라는 Exception을 던진 후 응답 종료
            throw new IllegalArgumentException("이미 등록된 재료입니다.");
        }

        memberIngredientRepository.saveMemberIngredient(
                memberId,
                ingredientId
        );
    }

    @Transactional
    public void deleteMyIngredient(Long memberId, Long ingredientId) {
        // 1. MemberIngredient Table에서 이미 가진 재료인지 아닌지 먼저 검증
        boolean exists =
                memberIngredientRepository.existsByMemberIdAndIngredientId(
                        memberId,
                        ingredientId
                );

        if (!exists) {
            // 2. 가지고 있지 않은 재료라는 Exception을 던진 후 응답 종료
            throw new IllegalArgumentException("가지고 있지 않은 재료입니다.");
        }
        memberIngredientRepository.deleteMemberIngredient(
                memberId,
                ingredientId
        );
    }
}
