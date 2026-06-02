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
    public String createAccessToken(String email) {

        Date now = new Date();

        return Jwts.builder()
                .subject(email)
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
}