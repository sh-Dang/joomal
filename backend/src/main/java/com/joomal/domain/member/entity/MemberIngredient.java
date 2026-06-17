package com.joomal.domain.member.entity;

import com.joomal.domain.ingredient.entity.Ingredient;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class MemberIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_ingredient_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;
}
