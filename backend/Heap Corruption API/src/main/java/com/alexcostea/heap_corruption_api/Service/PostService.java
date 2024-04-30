package com.alexcostea.heap_corruption_api.Service;
import com.alexcostea.heap_corruption_api.Domain.Post;
import com.alexcostea.heap_corruption_api.Domain.User;
import com.alexcostea.heap_corruption_api.Repository.PostRepository;
import com.alexcostea.heap_corruption_api.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    ObjectMapper objectMapper = new ObjectMapper();

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Post savePost(String postJson) throws Exception {
        Post post = objectMapper.readValue(postJson, Post.class);

        if (!post.getDatePosted().toString().matches("\\d{4}-\\d{2}-\\d{2}")) {
            throw new Exception("Invalid date format");
        }

        if (!userRepository.existsById(post.getUserId())) {
            throw new Exception("User not found");
        } else {
            User user = userRepository.findById(post.getUserId()).get();
            user.setNrPosts(user.getNrPosts() + 1);
            userRepository.save(user);
        }
        return postRepository.save(post);
    }

    public void deletePost(Long id) throws Exception {
        if (!postRepository.existsById(id)) {
            throw new Exception("Post not found");
        } else {
            Post post = postRepository.findById(id).get();
            User user = userRepository.findById(post.getUserId()).get();
            user.setNrPosts(user.getNrPosts() - 1);
            userRepository.save(user);
        }
        postRepository.deleteById(id);
    }

    public Post updatePost(Long id, String postJson) throws Exception {
        Post post = objectMapper.readValue(postJson, Post.class);

        if (!postRepository.existsById(id)) {
            throw new Exception("Post not found");
        }
        if (!post.getDatePosted().toString().matches("\\d{4}-\\d{2}-\\d{2}")) {
            throw new Exception("Invalid date format");
        }

        post.setId(id);
        if (!userRepository.existsById(post.getUserId())) {
            throw new Exception("User not found");
        }
        return postRepository.save(post);
    }
}
