package com.joomal.domain.member.entity;

import com.joomal.domain.cocktail.entity.Cocktail;
import com.joomal.domain.ingredient.entity.Ingredient;
import jakarta.persistence.*;

@Entity
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Long id;

    @JoinColumn(name = "member_id")
    private Member memberId;

    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktailId;

    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredientId;

}
