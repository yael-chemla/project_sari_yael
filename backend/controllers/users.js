import * as UserModel from '../models/users.js';


export const getUserByEmail = async (req, res) => {
  try {
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

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; 
    const { id, name: userName, email: userEmail } = await UserModel.createUser(name, email, password);
    res.status(201).json({ 
      id, 
      name: userName, 
      email: userEmail 
    }); 

  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};