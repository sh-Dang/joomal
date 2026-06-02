package com.joomal.auth.handler;

import com.joomal.auth.service.AuthService;
import com.joomal.global.security.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;

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

        OAuth2User user =
                (OAuth2User) authentication.getPrincipal();

        // authService 내부 로그인 메서드 호출
        authService.login(user);

        String email =
                user.getAttribute("email");

        String token =
                jwtProvider.createAccessToken(email);

        // 바로 메인으로 보내기
        response.sendRedirect("http://localhost:3000/?token=" + token);
    }
}