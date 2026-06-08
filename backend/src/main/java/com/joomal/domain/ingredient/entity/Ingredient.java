package com.joomal.domain.ingredient.entity;

import com.joomal.domain.ingredient.enumtype.Category;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ingredient_id")
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(name="category")
    private Category category;

    @Column(name="subcategory")
    private String subcategory;

    @Column(name="name")
    private String name;
}
