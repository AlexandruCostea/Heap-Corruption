package com.alexcostea.heap_corruption_api.Repository;
import com.alexcostea.heap_corruption_api.Domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

}
