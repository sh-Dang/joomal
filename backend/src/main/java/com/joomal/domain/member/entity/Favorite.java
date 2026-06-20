package com.joomal.domain.member.entity;

import com.joomal.domain.member.enumtype.FavoriteType;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="favorite_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    private FavoriteType targetType;

    private Long targetId;
}