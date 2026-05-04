import pool from '../config/database.js';

export async function getUserById(id) {
    const [rows] = await pool.execute("SELECT id, name, email FROM users WHERE id = ?", [id]);
    return rows[0];
}

export async function getUserByEmail(email) {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}

export async function createUser(name, email, password) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction(); 

        //  יצירת המשתמש בטבלת users
        const [userResult] = await connection.execute(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            [name, email]
        );
        const userId = userResult.insertId;

        // יצירת הסיסמה בטבלת passwords 
        await connection.execute(
            "INSERT INTO passwords (userId, password) VALUES (?, ?)",
            [userId, password]
        );

        await connection.commit(); 
        return { id: userId, name, email };
    } catch (error) {
        await connection.rollback(); 
        throw error;
    } finally {
        connection.release();
    }
}

