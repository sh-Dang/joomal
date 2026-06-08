package com.joomal.domain.cocktail.controller;

import com.joomal.domain.cocktail.dto.CocktailResponseDto;
import com.joomal.domain.cocktail.entity.Cocktail;
import com.joomal.domain.cocktail.service.CocktailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cocktails")
@RequiredArgsConstructor
public class CocktailController {

    private final CocktailService cocktailService;

    @GetMapping
    public ResponseEntity<List<CocktailResponseDto>> getAllCocktails() {
        return ResponseEntity.ok(cocktailService.getAllCocktails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Cocktail>> getCocktail(@PathVariable Long id) {
        return ResponseEntity.ok(cocktailService.getCocktail(id));
    }
}
