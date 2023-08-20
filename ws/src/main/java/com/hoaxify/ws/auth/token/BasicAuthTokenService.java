package com.hoaxify.ws.auth.token;

import java.util.Base64;

import org.springframework.stereotype.Service;

import com.hoaxify.ws.auth.dto.Credentials;
import com.hoaxify.ws.user.User;

@Service
public class BasicAuthTokenService implements TokenService {

    @Override
    public Token createToken(User user, Credentials creds) {
        String emailColonPassword = creds.email() + ":" + creds.password();
        String token = Base64.getEncoder().encodeToString(emailColonPassword.getBytes());
        return new Token("Basic", token);
    }

    @Override
    public User verifyToken(String authorizationHeader) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'verifyToken'");
    }
    
}
