package com.blumbit.compras_ventas.auth;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Value("${application.security.jwt.expiration}")
    private Long jwtExpiration;

    @Value("${application.security.jwt.refresh.expiration}")
    private Long refreshExpiration;

    //extract username
    public String extractUsername(String token) {
        return Jwts.parser()
        .verifyWith(getSignKey())
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
    }
    //generate Token
    //generate RefreshToken
    //build token
    //isTokenValid
    //isTokenExpired

    private SecretKey getSignKey() {
        final byte[] keyBites = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBites);
    }
}
