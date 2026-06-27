package com.joomal.domain.cocktail.repository;

import com.joomal.domain.cocktail.entity.Cocktail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CocktailRepository extends JpaRepository<Cocktail, Long> {
    // 한글 이름 또는 영문 이름에 키워드가 포함된 칵테일 목록 조회 (대소문자 무시)
    List<Cocktail> findByKorNameContainingIgnoreCaseOrEngNameContainingIgnoreCase(
            String korKeyword, String engKeyword
    );
}
