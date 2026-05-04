import * as PasswordModel from '../models/passwords.js';
import * as UserModel from '../models/users.js';



export const verifyLogin = async (req, res) => {
    try {
        // המשתמש שולח אימייל וסיסמה מה-React
        const { email, password } = req.body;

        // if (!email || !password) {
        //     return res.status(400).json({ error: 'Email and password are required' });
        // }

        const user = await UserModel.getUserByEmail(email);

        // אם האימייל לא קיים בדאטהבייס
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // שליפת הסיסמה מהטבלה הנפרדת בעזרת ה-id של המשתמש שמצאנו
        const dbPassword = await PasswordModel.getPasswordByUserId(user.id);

        if (dbPassword === password) {
            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login' });
    }
};
