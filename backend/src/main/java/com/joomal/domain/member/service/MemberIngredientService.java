package com.joomal.domain.member.service;

import com.joomal.domain.ingredient.enumtype.Type;
import com.joomal.domain.member.dto.MemberIngredientResponseDto;
import com.joomal.domain.member.entity.MemberIngredient;
import com.joomal.domain.member.repository.MemberIngredientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberIngredientService {

    private final MemberIngredientRepository memberIngredientRepository;

    public List<MemberIngredientResponseDto> getMemberIngredients(Long memberId, Type type){
        log.debug("@@@전달된 타입 매개변수: {}", type); // 최초 null반환 확인
        List<MemberIngredient> memberIngredients;

        // repository에 쿼리구현
        memberIngredients = memberIngredientRepository.findByMemberIdAndIngredientType(memberId, type);

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

    // 재료를 가지고있는지 조회해서 클라이언트에 반환할 메서드
    public boolean hasIngredient(Long memberId, Long ingredientId) {
        return memberIngredientRepository.existsByMemberIdAndIngredientId(
                memberId,
                ingredientId
        );
    }

}
