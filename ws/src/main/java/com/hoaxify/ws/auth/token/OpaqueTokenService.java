package com.hoaxify.ws.auth.token;

import java.util.Optional;
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
        var tokenInDB = getToken(authorizationHeader);
        if(!tokenInDB.isPresent()) return null;
        return tokenInDB.get().getUser();
    }

    @Override
    public void logout(String authorizationHeader) {
        var tokenInDB = getToken(authorizationHeader);
        if(!tokenInDB.isPresent()) return;
        tokenRepository.delete(tokenInDB.get());
    }

    private Optional<Token> getToken(String authorizationHeader){
        if(authorizationHeader == null) return Optional.empty();
        var token = authorizationHeader.split(" ")[1];
        return tokenRepository.findById(token);
    }
    
}
