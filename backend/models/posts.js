import pool from '../config/database.js';

export async function getAllPosts() {
    const [rows] = await pool.execute(`
        SELECT posts.*, users.name as authorName 
        FROM posts 
        JOIN users ON posts.userId = users.id 
        ORDER BY posts.id ASC
    `);
    return rows;
}


export async function createPost(userId, title, body) {
    const [result] = await pool.execute(
        "INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)",
        [userId, title, body]
    );
    return result.insertId;
}

export async function updatePost(id, title, body) {
    await pool.execute("UPDATE posts SET title = ?, body = ? WHERE id = ?", [title, body, id]);
}

export async function deletePost(id) {
    await pool.execute("DELETE FROM posts WHERE id = ?", [id]);
}
export async function getPostById(id) {
    const [rows] = await pool.execute("SELECT * FROM posts WHERE id = ?", [id]);
    return rows[0];
}