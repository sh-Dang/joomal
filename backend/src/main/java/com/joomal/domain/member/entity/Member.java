package com.joomal.domain.member.entity;

import com.joomal.domain.member.enumtype.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "member")
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id; // PK

    @Column(name = "nickname")
    private String nickname; // 사용자 닉네임

    // TODO : 현재는 기본(NULL)로 설정해두고 추후 이미지 업로드 기능 구현
    @Column(name = "profile_image")
    private String profileImage;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role; // 유저와 admin 구분하기

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt; // 생성시기

    @CreationTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt; // 최종 수정시기

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt; // SoftDeleted 시기(@CreationTimeStamp 사용X)
}
