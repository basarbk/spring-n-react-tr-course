package com.hoaxify.ws.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByEmail(String email);

    User findByActivationToken(String token);

    Page<User> findByIdNot(long id, Pageable page);

    User findByPasswordResetToken(String passwordResetToken);

}
