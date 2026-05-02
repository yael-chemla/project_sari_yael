// 1. ייבוא המודל תחת שם "כינוי" (UserModel)
import * as UserModel from '../models/users.js';

// 2. עכשיו אין התנגשות שמות!
export const getUserById = async (req, res) => {
  try {
    // קוראים לפונקציה מתוך האובייקט UserModel
    const user = await UserModel.getUserById(req.params.id); 
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    // אם את שולחת ב-Postman בתוך ה-Body, צריך לקחת מ-req.body
    const email = req.body.email || req.query.email; 
    
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// export const createUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     if (!name || !email) {
//       return res.status(400).json({ error: 'Name and email are required' });
//     }
//     const id = await UserModel.createUser(name, email);
//     res.status(201).json({ id });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// };
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // לקבל גם סיסמה
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const id = await UserModel.createUser(name, email, password);
    res.status(201).json({ id, name, email }); // להחזיר אובייקט משתמש מלא
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};