package com.joomal.domain.cocktail.entity;

import jakarta.persistence.*;

@Entity
public class RecipeStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="recipe_step_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;

    @Column(name="step_number")
    private Integer stepNo;

    @Column(name="instruction")
    private String instruction;
}
