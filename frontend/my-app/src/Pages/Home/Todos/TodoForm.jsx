import { addTodo } from "../../../API/todos";
import { useState, useContext } from "react";
import { UserContext } from "../../../Hooks/UserContext.jsx";

export default function TodoForm({ onAdded }) {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if (!title.trim()) return;
        try {
            setIsSubmitting(true);
            // וודאי שה-API מחזיר את response.data
            const response = await addTodo({
                userId: user.id,
                title: title.trim(),
                completed: 0 // עדיף לשלוח 0 כברירת מחדל ל-SQL
            });

            // בדיקה: אם response הוא כבר המידע (כמו ב-api.js שלך), אל תשתמשי ב-.data
            const newTodo = response.data || response;
            onAdded(newTodo);
        } catch (error) {
            console.error("Add error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="todo-form">
            <input
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        submit();
                    }
                }}
                disabled={isSubmitting}
            />
            <button
                className="add-btn"
                onClick={submit}
                disabled={isSubmitting || !title.trim()}
            >
                {isSubmitting ? "Adding..." : "➕ Add"}
            </button>
        </div>
    );
}