import express from 'express';
import * as commentController from '../controllers/comments.js';

const router = express.Router();

// 1. קבלת תגובות לפי פוסט מסוים (GET /comments?postId=1)
router.get('/', commentController.getCommentsByPostId);

// 2. הוספת תגובה חדשה (POST /comments)
router.post('/', commentController.createComment);

export default router;