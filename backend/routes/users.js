// routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/users.js';

const router = express.Router();

// router.get('/', userController.getUserByEmail); // לשימוש ב-Login (למשל ?email=...)
router.get('/:id', userController.getUserById); // לשימוש בעמוד Info
router.post('/', userController.createUser);    // ליצירת משתמש חדש

export default router;