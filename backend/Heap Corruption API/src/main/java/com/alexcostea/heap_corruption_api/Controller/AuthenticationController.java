package com.alexcostea.heap_corruption_api.Controller;

import com.alexcostea.heap_corruption_api.Service.AuthenticationService;
import com.alexcostea.heap_corruption_api.Utils.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/{username}/{password}")
    public ResponseEntity<AuthenticationResponse> authenticateUser(@PathVariable String username, @PathVariable String password) {
        AuthenticationResponse response = authenticationService.authenticateUser(username, password);
        if (response.isAuthenticated()) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().build();
    }
}
