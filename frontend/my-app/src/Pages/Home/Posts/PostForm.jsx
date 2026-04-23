import { useState, useContext } from "react";
import { addPost } from '../../../API/posts';
import { UserContext } from "../../../Hooks/UserContext.jsx";

export default function PostForm({ onPostAdded }) {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        // וולידציה - לוודא שאין רק רווחים
        if (!title.trim() || !body.trim()) return;

        try {
            setIsSubmitting(true);
            
            // שליחת הפוסט לשרת. השרת יחזיר אובייקט עם ה-ID שנוצר ב-MySQL
            const newPost = await addPost({ 
                userId: user.id, 
                title: title.trim(), 
                body: body.trim() 
            });

            // עדכון ה-State באבא כדי שהפוסט יופיע מיד ברשימה
            onPostAdded(newPost);
            
            // ניקוי הטופס
            setTitle(""); 
            setBody("");
        } catch (err) {
            console.error("Add post error:", err);
            alert("Failed to add post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="post-form-wrapper">
            <div className="post-form">
                <h3>Create New Post</h3>
                <input 
                    className="post-form-input" 
                    placeholder="What's on your mind? (Title)" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    disabled={isSubmitting}
                />
                <textarea 
                    className="post-form-textarea" 
                    placeholder="Write your content here..." 
                    value={body} 
                    onChange={(e) => setBody(e.target.value)} 
                    rows="4"
                    disabled={isSubmitting}
                />
                <button 
                    className="post-form-btn" 
                    onClick={submit} 
                    disabled={isSubmitting || !title.trim() || !body.trim()}
                >
                    {isSubmitting ? "Posting..." : "Add Post"}
                </button>
            </div>
        </div>
    );
}