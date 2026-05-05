import { api } from "./api";

export const getTodosByUser = (userId) =>
  api.get(`/todos?userId=${userId}`);

export const addTodo = (todo) =>
  api.post("/todos", {
    userId: todo.userId,
    title: todo.title,
    completed: todo.completed || false
  });

export const updateTodo = (id, data) =>
  api.put(`/todos/${id}`, {
      title: data.title,
      completed: data.completed
  });

export const deleteTodo = (id) =>
  api.delete(`/todos/${id}`);