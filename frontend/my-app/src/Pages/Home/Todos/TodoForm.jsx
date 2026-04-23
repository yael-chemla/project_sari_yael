import { addTodo } from "../../../API/todos";
import { useState, useContext } from "react";
import { UserContext } from "../../../Hooks/UserContext.jsx";

export default function TodoForm({ onAdded }) {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        // וולידציה: לוודא שהכותרת לא ריקה או מכילה רק רווחים
        if (!title.trim()) return;

        try {
            setIsSubmitting(true);
            
            // שליחת הנתונים לשרת
            // בשרת ה-MySQL החדש שלך, ה-ID ייווצר אוטומטית (Auto Increment)
            const newTodo = await addTodo({ 
                userId: user.id, 
                title: title.trim(), 
                completed: false 
            });

            // עדכון רשימת ה-Todos בקומפוננטת האבא
            onAdded(newTodo);
            
            // איפוס השדה
            setTitle("");
        } catch (error) {
            console.error("Add todo error:", error);
            alert("Failed to add todo. Please check your server connection.");
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