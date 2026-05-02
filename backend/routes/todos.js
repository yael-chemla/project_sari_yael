import express from 'express';
import * as todoController from '../controllers/todos.js';

const router = express.Router();



// 1. קבלת רשימה (GET /todos?userId=1)
router.get('/', todoController.getTodosByUserId);

// 2. יצירת משימה חדשה (POST /todos)
router.post('/', todoController.createTodo);

// 3. עדכון משימה (PUT /todos/:id)
router.put('/:id', todoController.updateTodo);

// 4. מחיקת משימה (DELETE /todos/:id)
router.delete('/:id', todoController.deleteTodo);

export default router;