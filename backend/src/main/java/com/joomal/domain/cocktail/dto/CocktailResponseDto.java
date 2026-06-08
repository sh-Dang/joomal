package com.joomal.domain.cocktail.dto;

import com.joomal.domain.cocktail.entity.Cocktail;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class CocktailResponseDto {
    private Long id;
    private String korName;
    private String engName;
    private String description;
    private String imageUrl;
    private BigDecimal abv;
    private String glassType;

    public static CocktailResponseDto from(Cocktail cocktail) {
        return CocktailResponseDto.builder()
                .id(cocktail.getId())
                .korName(cocktail.getKorName())
                .engName(cocktail.getEngName())
                .description(cocktail.getDescription())
                .imageUrl(cocktail.getImageUrl())
                .abv(cocktail.getAbv())
                .glassType(cocktail.getGlassType())
                .build();
    }
}
