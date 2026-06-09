package com.joomal.domain.ingredient.entity;

import com.joomal.domain.ingredient.enumtype.Category;
import com.joomal.domain.ingredient.enumtype.Subcategory;
import com.joomal.domain.ingredient.enumtype.Type;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ingredient_id")
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(name="type")
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(name="category")
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(name="subcategory")
    private Subcategory subcategory;

    @Column(name="kor_name")
    private String korName;

    @Column(name="eng_name")
    private String engName;

    @Column(name="image_url")
    private String imgaeUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
