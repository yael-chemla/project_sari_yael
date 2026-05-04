import * as UserModel from '../models/users.js';

export const getUserById = async (req, res) => {
  try {
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
    // if (!name || !email || !password) {
    //   return res.status(400).json({ error: 'All fields are required' });
    // }
    const id = await UserModel.createUser(name, email, password);
    res.status(201).json({ id, name, email }); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};