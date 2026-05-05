import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 

dotenv.config();

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import todoRoutes from './routes/todos.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 השרת רץ בהצלחה בכתובת: http://localhost:${PORT}`);
});