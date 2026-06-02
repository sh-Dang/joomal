package com.joomal.domain.member.repository;

import com.joomal.domain.member.entity.SocialAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.security.Provider;
import java.util.Optional;

@Repository
public interface SocialAccountRepository extends JpaRepository {

    // provider와 providerId를 조회해서 유저가 존재하는지 판단하는 로직
    Optional<SocialAccount>
        findByProviderAndProviderId(
                Provider provider,
                String providerId
        );
}
