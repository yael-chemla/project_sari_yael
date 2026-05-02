import * as CommentModel from '../models/comments.js';
export const getCommentsByPostId = async (req, res) => {
    try {
        const postId = req.query.postId;

        if (!postId) {
            return res.status(400).json({ error: 'Post ID is required' });
        }

        const comments = await CommentModel.getCommentsByPostId(postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

export const createComment = async (req, res) => {
    try {
        const { postId, userId, name, email, body } = req.body;
        if (!postId || !userId || !name || !email || !body) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newCommentId = await CommentModel.createComment(postId, userId, name, email, body);

        res.status(201).json({
            id: newCommentId,
            postId,
            userId,
            name,
            email,
            body
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' });
    }
};