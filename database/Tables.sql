-- PostgreSQL database

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    nr_posts INT DEFAULT 0
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    upvotes INT DEFAULT 0,
    date_posted DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_user_posts
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);