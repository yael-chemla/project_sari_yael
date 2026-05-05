import { useState } from "react";
import { updateTodo, deleteTodo } from "../../../API/todos";

export default function TodoItem({ todo, onUpdated, onDeleted }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleToggle = async () => {
    try {
      const newStatus = todo.completed ? 0 : 1;
      const updatedTodoData = await updateTodo(todo.id, {
        title: todo.title,
        completed: newStatus,
      });

      onUpdated({ ...todo, completed: newStatus });
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleSaveTitle = async () => {
    if (!title.trim()) return;
    try {
      const updatedTodoData = await updateTodo(todo.id, {
        title: title.trim(),
        completed: todo.completed,
      });

      const finalUpdate =
        updatedTodoData && updatedTodoData.id
          ? updatedTodoData
          : { ...todo, title: title.trim() };

      onUpdated(finalUpdate);
      setEdit(false);
    } catch (err) {
      console.error("Update title error:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteTodo(todo.id);
      onDeleted(todo.id);
    } catch (err) {
      alert("Error deleting");
    }
  };

  return (
    <div className={`todo-card ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={Boolean(todo.completed)}
        onChange={handleToggle}
      />
      <span className="todo-id" style={{ marginRight: "10px", fontWeight: "bold", color: "#888" }}>
        #{todo.id}
      </span>

      {edit ? (
        <div className="edit-mode">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <button onClick={handleSaveTitle}>💾</button>
          <button
            onClick={() => {
              setEdit(false);
              setTitle(todo.title);
            }}
          >
            ❌
          </button>
        </div>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              flex: 1, 
            }}
          >
            {todo.title}
          </span>
          <div className="todo-actions">
            <button onClick={() => setEdit(true)}>✏️</button>
            <button onClick={handleDelete}>🗑️</button>
          </div>
        </>
      )}
    </div>
  );
}