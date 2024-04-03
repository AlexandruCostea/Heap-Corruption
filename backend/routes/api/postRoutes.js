import  express from 'express';
import postsController from '../../controller/postsController.js';

const router = express.Router();

router.get('/posts', postsController.getPosts);

router.get('/posts/:id', postsController.getPost);

router.post('/posts', postsController.createPost);

router.put('/posts/:id', postsController.updatePost);

router.delete('/posts/:id', postsController.deletePost);

export default router;