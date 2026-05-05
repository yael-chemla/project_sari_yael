import express from 'express';
import * as postController from '../controllers/posts.js';

const router = express.Router();

router.get('/', postController.getAllPosts);

router.post('/', postController.createPost);

router.put('/:id', postController.updatePost);

router.delete('/:id', postController.deletePost);

router.get('/:id', postController.getPostById);
export default router;