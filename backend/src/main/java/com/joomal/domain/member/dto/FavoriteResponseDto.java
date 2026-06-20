package com.joomal.domain.member.dto;

import com.joomal.domain.member.enumtype.FavoriteType;
import lombok.Builder;

@Builder
public record FavoriteResponseDto (
    // 필요한거 engName, korName, image_url, 각가 id 정도(연결해야 되니까), 근데 id로 구분하면 안되나..?
    FavoriteType favoriteType,
    Long targetId,
    String engName,
    String korName,
    String imageUrl
) {
}