import pool from '../config/database.js';

export async function getTodosByUserId(userId) {
    const [rows] = await pool.execute(
        "SELECT * FROM todos WHERE userId = ? ORDER BY id ASC", 
        [userId]
    );
    return rows;
}

export async function createTodo(userId, title) {
    const [result] = await pool.execute(
        "INSERT INTO todos (userId, title, completed) VALUES (?, ?, false)",
        [userId, title]
    );
    return result.insertId;
}


export async function updateTodo(id, title, completed) {
    await pool.execute(
        "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
        [title, completed, id]
    );
}


export async function deleteTodo(id) {
    await pool.execute("DELETE FROM todos WHERE id = ?", [id]);
}