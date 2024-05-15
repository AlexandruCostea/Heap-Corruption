package com.alexcostea.heap_corruption_api.Utils;

import com.alexcostea.heap_corruption_api.Repository.PostRepository;
import com.alexcostea.heap_corruption_api.Repository.UserRepository;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.alexcostea.heap_corruption_api.Domain.User;
import com.alexcostea.heap_corruption_api.Domain.Post;
import com.alexcostea.heap_corruption_api.WebSockets.WebSocketHandler;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Component
public class DataGenerator {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Value("${entities}")
    private int entitiesToAdd;

    @Value("${timerDelay}")
    private int timerDelay;

    private Faker faker = new Faker();

    private final WebSocketHandler webSocketHandler;

    @Autowired
    public DataGenerator(PostRepository postRepository, UserRepository userRepository, WebSocketHandler webSocketHandler) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.webSocketHandler = webSocketHandler;
    }

    @Scheduled(fixedDelayString = "${timerDelay}")
    public void addEntities() {
        if (entitiesToAdd > 0) {
            for (int i = 0; i < this.entitiesToAdd; i++) {
                addEntity();
                sendNotification();
            }
        }
        this.sendNotification();
    }

    public void addEntity() {
        List<Long> userIds = userRepository.findAll().stream().map(User::getId).toList();
        Long userId = userIds.get(faker.random().nextInt(0, userIds.size() - 1));

        Post post = new Post();
        post.setUserId(userId);
        post.setTitle(faker.lorem().sentence());
        post.setDescription(faker.lorem().paragraph());
        post.setUpvotes(faker.random().nextInt(0, 1000));
        Date date = faker.date().birthday();
        post.setDatePosted(new java.sql.Date(date.getTime()));

        postRepository.save(post);

        User user = userRepository.findById(userId).get();
        user.setNrPosts(user.getNrPosts() + 1);
        userRepository.save(user);
    }

    private void sendNotification() {
        List<Post> posts = postRepository.findAll();
        StringBuilder PostsJson = new StringBuilder("[ ");
        for (Post post : posts) {
            PostsJson.append("{ \"id\": ").append(post.getId()).append(", \"userId\": ").append(post.getUserId()).append(", \"title\": \"").append(post.getTitle()).append("\", \"description\": \"").append(post.getDescription()).append("\", \"upvotes\": ").append(post.getUpvotes()).append(", \"datePosted\": \"").append(post.getDatePosted()).append("\" },");
        }
        PostsJson = new StringBuilder(PostsJson.substring(0, PostsJson.length() - 1) + " ]");
        try {
            webSocketHandler.sendUpdateToAllClients(PostsJson.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
