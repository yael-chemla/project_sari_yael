import * as PasswordModel from '../models/passwords.js';
import * as UserModel from '../models/users.js';



export const verifyLogin = async (req, res) => {
    try {
        // המשתמש שולח אימייל וסיסמה מה-React
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // 1. שימוש בפונקציה שלך כדי למצוא את המשתמש לפי האימייל
        const user = await UserModel.getUserByEmail(email); 
        
        if (!user) {
            // אם האימייל לא קיים בדאטהבייס
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 2. שליפת הסיסמה מהטבלה הנפרדת בעזרת ה-id של המשתמש שמצאנו
        const dbPassword = await PasswordModel.getPasswordByUserId(user.id);

        // 3. בדיקה האם הסיסמה שהוקלדה תואמת למה ששמור בדאטהבייס
        if (dbPassword === password) {
            // הצלחה! מחזירים את פרטי המשתמש (ללא הסיסמה) לשמירה ב-LocalStorage
            res.json({ 
                message: 'Login successful', 
                user: { 
                    id: user.id, 
                    name: user.name, 
                    email: user.email 
                } 
            });
        } else {
            // סיסמה שגויה - מחזירים 401 (Unauthorized) לפי שלב ג'
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login' });
    }
};
