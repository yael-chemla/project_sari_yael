import { api } from "./api";

export const getPosts = (userId = null) => {
    const url = userId ? `/posts?userId=${userId}` : "/posts";
    return api.get(url);
};

export const addPost = (data) =>
  api.post("/posts", {
    userId: data.userId,
    title: data.title,
    body: data.body,
  });

export const updatePost = (id, data) =>
  api.put(`/posts/${id}`, {
    title: data.title,
    body: data.body,
  });

export const deletePost = (id) =>
  api.delete(`/posts/${id}`);

export const getCommentsByPost = (postId) =>
  api.get(`/comments?postId=${postId}`);


export const addComment = (commentData) =>
  api.post("/comments", {
    postId: commentData.postId,
    userId: commentData.userId, 
    name: commentData.name,
    email: commentData.email,
    body: commentData.body
  });

export const updateComment = (id, textContent) =>
  api.put(`/comments/${id}`, { body: textContent });
export const deleteComment = (id) =>
  api.delete(`/comments/${id}`);