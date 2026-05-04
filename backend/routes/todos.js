import express from 'express';
import * as todoController from '../controllers/todos.js';

const router = express.Router();

router.get('/', todoController.getTodosByUserId);

router.post('/', todoController.createTodo);

router.put('/:id', todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);

export default router;