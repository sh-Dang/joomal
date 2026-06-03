package com.joomal.domain.member.entity;

import com.joomal.domain.member.enumtype.SocialProvider;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="Social_Account")
@Getter
@Setter
public class SocialAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "social_account_id")
    private long Id; // PK

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_social_account_member"))
    private Member member; // 회원 FK

    @Enumerated(EnumType.STRING)
    @Column(name = "social_provider")
    private SocialProvider socialProvider; // 제공하는 SNS명

    @Column(name = "provider_user_id")
    private String providerUserId; // SNS에서 제공하는 ID

    @Column(name = "email", nullable = true)
    private String email; // 해당 회원 이메일

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt; // 계정 생성일자
}
