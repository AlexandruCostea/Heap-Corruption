const config = require('../config');
const { Client } = require('pg');

const getPosts = async (req, res) => {
    const query = 'SELECT * FROM posts';
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();
    client.query(query, (err, posts) => {
        if (err) {
            console.error('Error getting posts:', err);
        } else {
            const list = posts.rows;
            const postList = list.map((post) => {
                return {
                    id: post.id,
                    userId: post.user_id,
                    title: post.title,
                    description: post.description,
                    upvotes: post.upvotes,
                    datePosted: post.date_posted
                }
            });
            res.json(postList);
        }
        client.end();
    });
}
 
const getPost = async (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM posts WHERE id = $1';
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();
    client.query(query, [id], (err, post) => {
        if (err) {
            console.error('Error getting post:', err);
        } else {
            const list = post.rows;
            if (list.length > 0) {
                const post = list[0];
                const postObj = {
                    id: post.id,
                    userId: post.user_id,
                    title: post.title,
                    description: post.description,
                    upvotes: post.upvotes,
                    datePosted: post.date_posted
                }
                res.json(postObj);
            } else {
                res.status(404).send(`Post with id ${id} not found`);
            }
        }
        client.end();
    });
}

const createPost = async (req, res) => {
    const post = req.body;
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();

    if (!post.userId || !post.title || !post.description || !post.upvotes || !post.datePosted) {
        res.status(400).send('Missing required fields: userId, title, description, upvotes, datePosted');
        client.end();
        return;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(post.datePosted)) {
        res.status(400).send('Invalid date format. Please use YYYY-MM-DD');
        client.end();
        return;
    }

    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const user = await client.query(userQuery, [post.userId]);
    if (user.rows.length === 0) {
        res.status(404).send(`User with id ${post.userId} not found`);
        client.end();
        return;
    }

    const query = 'INSERT INTO posts (user_id, title, description, upvotes, date_posted) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [post.userId, post.title, post.description, post.upvotes, post.datePosted];
    client.query(query, values, (err, newPost) => {
        if (err) {
            console.error('Error creating post:', err);
        } else {
            const result = newPost.rows[0];
            const postObj = {
                id: result.id,
                userId: result.user_id,
                title: result.title,
                description: result.description,
                upvotes: result.upvotes,
                datePosted: result.date_posted
            }
            res.json(postObj);
        }
        client.end();
    });
}

const updatePost = async (req, res) => {
    const post = req.body;
    const id = req.params.id;
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();

    const query = 'SELECT * FROM posts WHERE id = $1';
    const oldPost = await client.query(query, [id]);
    if (oldPost.rows.length === 0) {
        res.status(404).send(`Post with id ${id} not found`);
        client.end();
        return;
    }
    if (!post.userId || !post.title || !post.description || !post.upvotes || !post.datePosted) {
        res.status(400).send('Missing required fields: userId, title, description, upvotes, datePosted');
        client.end();
        return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(post.datePosted)) {
        res.status(400).send('Invalid date format. Please use YYYY-MM-DD');
        client.end();
        return;
    }

    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const user = await client.query(userQuery, [post.userId]);

    if (user.rows.length === 0) {
        res.status(404).send(`User with id ${post.userId} not found`);
        client.end();
        return;
    }

    const updateQuery = 'UPDATE posts SET user_id = $1, title = $2, description = $3, upvotes = $4, date_posted = $5 WHERE id = $6 RETURNING *';
    const values = [post.userId, post.title, post.description, post.upvotes, post.datePosted, id];
    client.query(updateQuery, values, (err, updatedPost) => {
        if (err) {
            console.error('Error updating post:', err);
        } else {
            const result = updatedPost.rows[0];
            const postObj = {
                id: result.id,
                userId: result.user_id,
                title: result.title,
                description: result.description,
                upvotes: result.upvotes,
                datePosted: result.date_posted
            }
            res.json(postObj);
        }
        client.end();
    });
}

const deletePost = async (req, res) => {
    const id = req.params.id;
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();
    const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
    client.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting post:', err);
        } else {
            const list = result.rows;
            if (list.length > 0) {
                const post = list[0];
                const postObj = {
                    id: post.id,
                    userId: post.user_id,
                    title: post.title,
                    description: post.description,
                    upvotes: post.upvotes,
                    datePosted: post.date_posted
                }
                res.json(postObj);
            } else {
                res.status(404).send(`Post with id ${id} not found`);
            }
        }
        client.end();
    });
}

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
