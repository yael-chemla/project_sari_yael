import express from 'express';
import * as authController from '../controllers/auth.js'; // או איך שקראת לקובץ בקונטרולר

const router = express.Router();

// כשמישהו פונה ב-POST לכתובת /login, הפונקציה verifyLogin תופעל
router.post('/login', authController.verifyLogin);

export default router;