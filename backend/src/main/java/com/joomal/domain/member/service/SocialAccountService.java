package com.joomal.domain.member.service;

import com.joomal.domain.member.entity.Member;
import com.joomal.domain.member.entity.SocialAccount;
import com.joomal.domain.member.enumtype.SocialProvider;
import com.joomal.domain.member.repository.SocialAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Provider;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SocialAccountService {
    private final SocialAccountRepository socialAccountRepository;

    public void createSocialAccount(
            Member member,
            String socialProvider,
            String providerUserId,
            String email){
        SocialAccount socialAccount = new SocialAccount();
        socialAccount.setMember(member);
        // ENUM 사용을 위한 UpperCase 통일 메서드
        socialAccount.setSocialProvider(
                SocialProvider.from(socialProvider)
        );
        socialAccount.setProviderUserId(providerUserId);
        socialAccount.setEmail(email);
        socialAccountRepository.save(socialAccount);
    }

    public Optional<SocialAccount> findBySocialProviderAndProviderUserId(
            SocialProvider provider,
            String providerId){
        return socialAccountRepository.findBySocialProviderAndProviderUserId(provider, providerId);
    }
}
