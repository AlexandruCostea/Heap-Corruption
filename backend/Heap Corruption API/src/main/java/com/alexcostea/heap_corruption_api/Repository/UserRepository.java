package com.alexcostea.heap_corruption_api.Repository;
import com.alexcostea.heap_corruption_api.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    User findByUsernameAndIdNot(String username, Long id);
}
