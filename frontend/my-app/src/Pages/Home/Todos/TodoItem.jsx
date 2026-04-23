import { useState } from "react";
import { updateTodo, deleteTodo } from "../../../API/todos";

export default function TodoItem({ todo, onUpdated, onDeleted }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);

  // שינוי מצב ה-Checkbox
  const handleToggle = async () => {
    try {
      // שליחת אובייקט שלם ל-PUT כפי שדרשנו ב-API
      const updated = await updateTodo(todo.id, { 
        userId: todo.userId, // חשוב לשלוח את ה-userId כדי שהשרת יוכל לאמת בעלות
        title: todo.title,
        completed: !todo.completed 
      });
      
      // אם השרת מחזיר את האובייקט המעודכן, נעדכן את ה-State של האבא
      onUpdated(updated); 
    } catch (err) {
      console.error("Toggle error:", err);
      alert("נכשל בעדכון הסטטוס");
    }
  };

  // מחיקת Todo
  const handleDelete = async () => {
    // מומלץ להוסיף אישור לפני מחיקה
    if (!window.confirm("בטוח שברצונך למחוק מטלה זו?")) return;
    
    try {
      await deleteTodo(todo.id);
      onDeleted(todo.id);
    } catch (err) {
      alert("שגיאה במחיקה");
    }
  };

  // שמירת כותרת חדשה בעריכה
  const handleSaveTitle = async () => {
    if (!title.trim()) return;
    try {
      const updated = await updateTodo(todo.id, { 
        userId: todo.userId,
        title: title.trim(), 
        completed: todo.completed 
      });
      onUpdated(updated);  
      setEdit(false);
    } catch (err) {
      alert("נכשל בעדכון הכותרת");
    }
  };

  return (
    <div className={`todo-card ${todo.completed ? "completed" : "not-completed"}`}>
      <input
        type="checkbox"
        checked={!!todo.completed} // ה-!! מוודא המרה לבוליאני גם אם זה 0/1 מה-SQL
        onChange={handleToggle}
      />

      {edit ? (
        <div className="edit-mode">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()}
          />
          <div className="edit-actions">
            <button onClick={handleSaveTitle} title="Save">💾</button>
            <button onClick={() => { setEdit(false); setTitle(todo.title); }} title="Cancel">❌</button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-id">#{todo.id}</div>
          <div className="todo-title" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title}
          </div>

          <div className="todo-actions">
            <button onClick={() => setEdit(true)} title="Edit">✏️</button>
            <button onClick={handleDelete} title="Delete">🗑️</button>
          </div>
        </>
      )}
    </div>
  );
}