// import { api } from "./api";

// export const getPosts = () => api.get("/posts");

// export const addPost = (data) =>
//   api.post("/posts", {
//     userId: data.userId,
//     title: data.title,
//     body: data.body,
//   });

// export const updatePost = (id, data) =>
//   api.patch(`/posts/${id}`, {
//     title: data.title,
//     body: data.body,
//   });

// export const deletePost = (id) =>
//   api.delete(`/posts/${id}`);


// export const getCommentsByPost = (postId) =>
//   api.get(`/comments?postId=${postId}`);

// export const getCommentsByPost = (postId) =>
//   api.get(`/comments?postId=${postId}`);

// // וודאי שהשמות כאן תואמים בדיוק למה שה-Controller בסרבר מצפה (req.body)
// export const addComment = (commentData) =>
//   api.post("/comments", {
//     postId: commentData.postId,
//     userId: commentData.userId,
//     name: commentData.name,
//     email: commentData.email,
//     body: commentData.body
//   });

// export const updateComment = (id, body) =>
//   api.patch(`/comments/${id}`, { body });


// export const deleteComment = (id) =>
//   api.delete(`/comments/${id}`);

// // export const deleteCommentsByPost = async (postId) => {
// //   const comments = await api.get(`/comments?postId=${postId}`);
// //   await Promise.all(
// //     comments.map(comment =>
// //       api.delete(`/comments/${comment.id}`)
// //     )
// //   );
// // };
import { api } from "./api";

// הבאת כל הפוסטים (או לפי משתמש אם מעבירים userId)
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

// שינוי ל-PUT לפי דרישות הפרויקט
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
    userId: commentData.userId, // הוספנו לפי ה-Controller שלך
    name: commentData.name,
    email: commentData.email,
    body: commentData.body
  });

// שינוי ל-PUT
export const updateComment = (id, data) =>
  api.put(`/comments/${id}`, { 
    body: data.body 
  });

export const deleteComment = (id) =>
  api.delete(`/comments/${id}`);