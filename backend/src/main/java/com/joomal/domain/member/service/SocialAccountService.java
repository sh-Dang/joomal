package com.joomal.domain.member.service;

import com.joomal.domain.member.entity.SocialAccount;
import com.joomal.domain.member.repository.SocialAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Provider;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SocialAccountService {
    private final SocialAccountRepository socialAccountRepository;

    public Optional<SocialAccount> findByProviderAndProviderId(
            Provider provider,
            String providerId){
        Optional<SocialAccount> socialAccount = socialAccountRepository.findByProviderAndProviderId(provider, providerId);
        return socialAccount;
    }
}
