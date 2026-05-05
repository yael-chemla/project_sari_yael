import express from 'express';
import * as commentController from '../controllers/comments.js';
const router = express.Router();

router.put('/:id', commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

router.get('/', commentController.getCommentsByPostId);

router.post('/', commentController.createComment);

export default router;