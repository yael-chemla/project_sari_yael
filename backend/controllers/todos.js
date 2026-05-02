import * as TodoModel from '../models/todos.js';


export const getTodosByUserId = async (req, res) => {
    try {
        const userId = req.query.userId; 
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const todos = await TodoModel.getTodosByUserId(userId);
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

export const createTodo = async (req, res) => {
    try {
        const { userId, title } = req.body;
        if (!userId || !title) {
            return res.status(400).json({ error: 'User ID and title are required' });
        }
        const newId = await TodoModel.createTodo(userId, title);
        res.status(201).json({ id: newId, userId, title, completed: false });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
};


export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        
        await TodoModel.updateTodo(id, title, completed);
        res.json({ message: 'Todo updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await TodoModel.deleteTodo(id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};