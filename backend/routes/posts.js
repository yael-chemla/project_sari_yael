import express from 'express';
import * as postController from '../controllers/posts.js';

const router = express.Router();


//קבלת כל הפוסטים
router.get('/', postController.getAllPosts);

//  יצירת פוסט חדש 
router.post('/', postController.createPost);

//  עדכון פוסט 
router.put('/:id', postController.updatePost);

//  מחיקת פוסט 
router.delete('/:id', postController.deletePost);

router.get('/:id', postController.getPostById);
export default router;