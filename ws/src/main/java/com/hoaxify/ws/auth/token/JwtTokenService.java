package com.hoaxify.ws.auth.token;

import javax.crypto.SecretKey;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.auth.dto.Credentials;
import com.hoaxify.ws.user.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
@Primary
public class JwtTokenService implements TokenService{

    SecretKey key = Keys.hmacShaKeyFor("secret-must-be-at-least-32-chars".getBytes());

    @Override
    public Token createToken(User user, Credentials creds) {
        String token = Jwts.builder().setSubject(Long.toString(user.getId())).signWith(key).compact();
        return new Token("Bearer", token);
    }

    @Override
    public User verifyToken(String authorizationHeader) {
        if(authorizationHeader == null) return null;
        var token = authorizationHeader.split("Bearer ")[1];
        JwtParser parser = Jwts.parserBuilder().setSigningKey(key).build();
        try {
            Jws<Claims> claims = parser.parseClaimsJws(token);
            long userId = Long.valueOf(claims.getBody().getSubject());
            User user = new User();
            user.setId(userId);
            return user;
        } catch (JwtException e) {
            e.printStackTrace();
        }
        return null;
    }
    
}
