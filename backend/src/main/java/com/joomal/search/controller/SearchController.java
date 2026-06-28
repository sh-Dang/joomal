package com.joomal.search.controller;

import com.joomal.search.dto.SearchResponseDto;
import com.joomal.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 검색기능을 담당할 컨트롤러
 * 도메인의 책임을 지기보다는 도메인끼리 결합하는 기능을 가지기에 별도의 디렉토리로 구성
 */
@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    // 비즈니스 로직을 담당할 Service 주입
    private final SearchService searchService;

    // 검색된 내용을 담아 service에 전달해 검색을 요청하는 search 메서드
    @GetMapping
    public SearchResponseDto search(@RequestParam String keyword) {
        // GET /search?keyword=검색어 방식으로 요청을 보내 해당 검색기능이 올바르게 작동하는지 확인 가능
        return searchService.search(keyword);
    }
}
