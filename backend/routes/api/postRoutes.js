const express = require('express');
const postController = require('../../controller/postController');

const postRouter = express.Router();

postRouter.get('/posts', postController.getPosts);

postRouter.get('/posts/:id', postController.getPost);

postRouter.post('/posts', postController.createPost);

postRouter.put('/posts/:id', postController.updatePost);

postRouter.delete('/posts/:id', postController.deletePost);

module.exports = postRouter;