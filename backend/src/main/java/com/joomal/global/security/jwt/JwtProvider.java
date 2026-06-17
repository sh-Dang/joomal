package com.joomal.global.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secret;
    // 토큰 만료시간 설정
    @Value("${jwt.expiration}")
    private int exp;

    // 서비스(Joomal) 내부에서 사용할 토큰 발급 로직
    public String createAccessToken(Long memberId) {

        Date now = new Date();
        // 지금 담겨읶는 정보 : member의 Id(PK)
        return Jwts.builder()
                .subject(memberId.toString())
                .issuedAt(now)
                .expiration(
                        new Date(now.getTime() + exp)
                )
                .signWith(
                        Keys.hmacShaKeyFor(secret.getBytes()),
                        Jwts.SIG.HS256
                )
                .compact();
    }

    // 요청에 들어온 Jwt를 파싱해주는 메서드(토큰안의 정보를 백엔드에서 사용할 수 있도록)
    public String getSubject(String token) {

        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}