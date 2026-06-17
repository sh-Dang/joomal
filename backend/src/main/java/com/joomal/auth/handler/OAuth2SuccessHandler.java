package com.joomal.auth.handler;

import com.joomal.auth.dto.request.SocialLoginRequestDto;
import com.joomal.auth.service.AuthService;
import com.joomal.domain.member.entity.Member;
import com.joomal.global.security.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2SuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    // 응답 객체의 실제 JSON 직렬화 형태를 확인하기 위한 ObjectMapper
    private final ObjectMapper objectMapper;
    private final AuthService authService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            @NonNull Authentication authentication)
            throws IOException {

        log.debug("들어온 authentication객체 : {}",objectMapper.writeValueAsString(authentication));
        log.debug("들어온 authentication의 pricipal객체 : {}", objectMapper.writeValueAsString(authentication.getPrincipal()));
        log.debug("로그인시도 요청이 있습니다.");

        // SNS서버에서는 유효한 로그인 요청으로 판단
        // request 생성에 필요한 정보를 빼내고 매핑 -> login 메서드에 파라미터로 전달
        OAuth2AuthenticationToken socialProviderToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User user = socialProviderToken.getPrincipal();
        String socialProvider = socialProviderToken.getAuthorizedClientRegistrationId();
        String socialProviderId = user.getAttribute("sub");
        String email = user.getAttribute("email");

        SocialLoginRequestDto socialLoginRequestDto =
                new SocialLoginRequestDto(
                        socialProvider,
                        socialProviderId,
                        email
                );

        // authService 내부 로그인 메서드 호출
        // joomalService 내부 로그인 로직 구현하는 파트
        Member member = authService.login(socialLoginRequestDto)
                .orElseThrow(() ->
                        new RuntimeException("회원이 존재하지 않습니다."));

        String accessToken = jwtProvider.createAccessToken(member.getId());

        // 바로 메인으로 보내기
        response.sendRedirect("http://localhost:3000/?accessToken=" + accessToken);
    }
}