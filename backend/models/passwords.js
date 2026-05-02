import pool from '../config/database.js';


export async function getPasswordByUserId(userId) {
    const [rows] = await pool.execute("SELECT password FROM passwords WHERE userId = ?", [userId]);
    return rows[0]?.password; // מחזיר רק את השדה של הסיסמה
}
