package com.joomal.domain.cocktail.entity;

import com.joomal.domain.cocktail.enumtype.Unit;
import com.joomal.domain.ingredient.entity.Ingredient;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="recipe_ingredient_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private Unit unit;

}
