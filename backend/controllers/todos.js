import * as TodoModel from '../models/todos.js';


export const getTodosByUserId = async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log("Fetching todos for userId:", userId); // לוג לבדיקה

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const todos = await TodoModel.getTodosByUserId(userId);
        res.json(todos);
    } catch (error) {
        console.error(error); // חשוב כדי לראות שגיאות SQL
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};


export const createTodo = async (req, res) => {
    try {
        const { userId, title } = req.body;
        const newId = await TodoModel.createTodo(userId, title);
        
        // החזרת האובייקט המלא כדי שה-React יוכל להוסיף אותו לרשימה מיד
        res.status(201).json({ 
            id: newId, 
            userId, 
            title, 
            completed: 0 
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        
        await TodoModel.updateTodo(id, title, completed);
        
        // החזרת הנתונים המעודכנים
        res.json({ id: parseInt(id), title, completed });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};
// שאר הפונקציות (get ו-delete) נשארות כפי שהיו
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await TodoModel.deleteTodo(id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};