import * as PostModel from '../models/posts.js';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

export const createPost = async (req, res) => {
    try {
        const { userId, title, body } = req.body;
        const newPostId = await PostModel.createPost(userId, title, body);
        res.status(201).json({ id: newPostId, userId, title, body });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
};


export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;
        await PostModel.updatePost(id, title, body);
        res.json({ message: 'Post updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        
        await PostModel.deletePost(id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.getPostById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};