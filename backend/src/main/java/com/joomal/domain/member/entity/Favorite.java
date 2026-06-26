package com.joomal.domain.member.entity;

import com.joomal.domain.member.enumtype.FavoriteType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 외부에서하는 new Favorite() 방지, JPA만 사용 가능하게
@Table(
        name = "favorite",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_favorite_member_target",
                        columnNames = {"member_id", "target_type", "target_id"}
                )
        }
)
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

    public Favorite(Member member, FavoriteType targetType, Long targetId) {
        this.member = member;
        this.targetType = targetType;
        this.targetId = targetId;
    }
}