package com.alexcostea.heap_corruption_api.Service;
import com.alexcostea.heap_corruption_api.Domain.User;
import com.alexcostea.heap_corruption_api.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.util.List;
import java.util.Optional;

@Service
public class UserService{
    private final UserRepository userRepository;
    ObjectMapper objectMapper = new ObjectMapper();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User saveUser(String userDataJson) throws Exception {
        User user = objectMapper.readValue(userDataJson, User.class);

        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(user.getPassword().getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }

        user.setPassword(hexString.toString());

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new Exception("User already exists");
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) throws Exception {
        if (!userRepository.existsById(id)) {
            throw new Exception("User not found");
        }
        userRepository.deleteById(id);
    }

    public User updateUser(Long id, String userDataJson) throws Exception {
        User user = objectMapper.readValue(userDataJson, User.class);

        if (user.getUsername() == null || user.getFirstName() == null || user.getLastName() == null
        || user.getPassword() == null) {
            throw new Exception("Invalid user data");
        }

        if (!userRepository.existsById(id)) {
            throw new Exception("User not found");
        }

        user.setId(id);
        User existingUser = userRepository.findById(id).get();
        user.setNrPosts(existingUser.getNrPosts());

        if (userRepository.findByUsernameAndIdNot(user.getUsername(), id) != null) {
            throw new Exception("Username already exists");
        }
        return userRepository.save(user);
    }
}
