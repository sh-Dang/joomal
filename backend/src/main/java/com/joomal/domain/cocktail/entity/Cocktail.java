package com.joomal.domain.cocktail.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// 칵테일 엔터티 매핑
@Entity
@Table(name = "cocktail")
@Getter
public class Cocktail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cocktail_id")
    private Long id;

    @Column(name = "kor_name", nullable = false, length = 100)
    private String korName;

    @Column(name = "eng_name", nullable = false, length = 100)
    private String engName;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "abv", precision = 4, scale = 1)
    private BigDecimal abv; // 도수

    @Column(name = "glass_type", length = 50)
    private String glassType; // 사용하는 잔

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
