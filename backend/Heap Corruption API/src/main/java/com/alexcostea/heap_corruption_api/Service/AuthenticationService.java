package com.alexcostea.heap_corruption_api.Service;


import com.alexcostea.heap_corruption_api.Repository.UserRepository;
import com.alexcostea.heap_corruption_api.Utils.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;

import java.util.Date;

@Service
public class AuthenticationService {

    @Autowired
    private final UserRepository userRepository;

    public AuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthenticationResponse authenticateUser(String username, String password) {
        boolean exists = userRepository.existsByUsernameAndPassword(username, password);
        if (exists) {
            String token = generateToken(username);
            return new AuthenticationResponse(true, token);
        } else {
            return new AuthenticationResponse(false, null);
        }
    }

    private String generateToken(String username) {
        Date expirationDate = new Date(System.currentTimeMillis() + 3600000);
        Long userId = userRepository.findByUsername(username).getId();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX");
        String formattedExpirationDate = dateFormat.format(expirationDate);

        return "{" +
                "\"id\": \"" + userId + "\"," +
                "\"expirationDate\": \"" + formattedExpirationDate + "\"" +
                "}";
    }
}
