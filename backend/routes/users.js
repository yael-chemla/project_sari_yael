// routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/users.js';

const router = express.Router();
//לinfo
router.get('/:id', userController.getUserById); 

router.post('/', userController.createUser);    
export default router;