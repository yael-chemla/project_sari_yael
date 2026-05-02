import express from 'express';
import * as postController from '../controllers/posts.js';

const router = express.Router();


// 1. קבלת כל הפוסטים (GET /posts)
// מחזיר את רשימת כל הפוסטים של כל המשתמשים (כפי שנדרש בשלב ה')
router.get('/', postController.getAllPosts);

// 2. יצירת פוסט חדש (POST /posts)
router.post('/', postController.createPost);

// 3. עדכון פוסט (PUT /posts/:id)
// שים לב: לפי שלב ה', רק בעל הפוסט רשאי לעדכן
router.put('/:id', postController.updatePost);

// 4. מחיקת פוסט (DELETE /posts/:id)
// שים לב: לפי שלב ה', רק בעל הפוסט רשאי למחוק
router.delete('/:id', postController.deletePost);


// תוסיפי את השורה הזו מתחת ל-router.get של כל הפוסטים
router.get('/:id', postController.getPostById);
export default router;