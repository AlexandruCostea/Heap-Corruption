const express = require('express');
const router = express.Router();
const postsController = require('../../controller/postsController');

router.get('/posts', postsController.getPosts);

router.get('/posts/:id', postsController.getPost);

router.post('/posts', postsController.createPost);

router.put('/posts/:id', postsController.updatePost);

router.delete('/posts/:id', postsController.deletePost);

module.exports = router;