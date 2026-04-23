import { api } from "./api";

// הבאת מטלות של משתמש ספציפי (חובה לפי דרישות שלב ד')
export const getTodosByUser = (userId) =>
  api.get(`/todos?userId=${userId}`);

export const addTodo = (todo) =>
  api.post("/todos", {
    userId: todo.userId,
    title: todo.title,
    completed: todo.completed || false
  });

// שינוי ל-PUT - משמש גם לשינוי ה-Checkbox וגם לשינוי הטקסט
export const updateTodo = (id, data) =>
  api.put(`/todos/${id}`, {
      title: data.title,
      completed: data.completed
  });

export const deleteTodo = (id) =>
  api.delete(`/todos/${id}`);