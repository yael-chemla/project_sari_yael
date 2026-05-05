import pool from '../config/database.js';

export async function getCommentsByPostId(postId) {
    const [rows] = await pool.execute(
        "SELECT * FROM comments WHERE postId = ? ORDER BY id ASC",
        [postId]
    );
    return rows;
}

export async function createComment(postId, userId, name, email, body) {
    const [result] = await pool.execute(
        "INSERT INTO comments (postId, userId, name, email, body) VALUES (?, ?, ?, ?, ?)",
        [postId, userId, name, email, body]
    );
    return result.insertId;
}

export async function updateComment(id, body) {    
    await pool.execute(
        "UPDATE comments SET body = ? WHERE id = ?",
        [body, id]
    );
    const [rows] = await pool.execute("SELECT * FROM comments WHERE id = ?", [id]);
    return rows[0]; 
}

export async function deleteComment(id) {
     await pool.execute(
        "DELETE FROM comments WHERE id = ?",
        [id]
    );
}


