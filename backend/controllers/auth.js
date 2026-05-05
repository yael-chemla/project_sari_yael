import * as PasswordModel from '../models/passwords.js';
import * as UserModel from '../models/users.js';



export const verifyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
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
