package com.hoaxify.ws.auth.token;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.auth.dto.Credentials;
import com.hoaxify.ws.user.User;

@Service
@ConditionalOnProperty(name = "hoaxify.token-type", havingValue = "opaque")
public class OpaqueTokenService implements TokenService {

    @Autowired
    TokenRepository tokenRepository;

    @Override
    public Token createToken(User user, Credentials creds) {
        String randomValue = UUID.randomUUID().toString();
        Token token = new Token();
        token.setToken(randomValue);
        token.setUser(user);
        return tokenRepository.save(token);
    }

    @Override
    public User verifyToken(String authorizationHeader) {
        if(authorizationHeader == null) return null;
        var token = authorizationHeader.split(" ")[1];
        var tokenInDB = tokenRepository.findById(token);
        if(!tokenInDB.isPresent()) return null;
        return tokenInDB.get().getUser();
    }
    
}
