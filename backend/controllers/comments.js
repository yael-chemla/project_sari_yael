import * as CommentModel from '../models/comments.js';

export const getCommentsByPostId = async (req, res) => {
    try {
        const postId = req.query.postId;
        if (!postId)
             return res.status(400).json({ error: 'Post ID is required' });
        const comments = await CommentModel.getCommentsByPostId(postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await CommentModel.getCommentById(id);
        
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comment' });
    }
};

export const createComment = async (req, res) => {
    try {
        const { postId, userId, name, email, body } = req.body;
        // if (!postId || !userId || !name || !email || !body) {
        //     return res.status(400).json({ error: 'All fields are required' });
        // }
        const newCommentId = await CommentModel.createComment(postId, userId, name, email, body);
        res.status(201).json({ id: newCommentId, postId, userId, name, email, body });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' });
    }
};

// export const updateComment = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { body } = req.body;
//         if (!body) return res.status(400).json({ error: 'Body is required' });

//         const updatedComment = await CommentModel.updateComment(id, body);
//         res.json(updatedComment);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to update comment' });
//     }
// };
// controllers/comments.js
export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    try {
        // if (!body) {
        //     return res.status(400).json({ error: 'Body is required' });
        // }

        const updatedComment = await CommentModel.updateComment(id, body);
        
        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await CommentModel.deleteComment(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};