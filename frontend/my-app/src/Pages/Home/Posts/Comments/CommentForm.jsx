import { useState, useContext } from "react";
import { UserContext } from "../../../../Hooks/UserContext";
import { addComment } from "../../../../API/posts";

export default function CommentForm({ postId, onCommentAdded }) {
  const { user } = useContext(UserContext);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    // מניעת שליחת טקסט ריק או רווחים בלבד
    if (!text.trim()) return;

    try {
      setLoading(true);
      
      // ב-MySQL, ה-postId וה-userId הם השדות החשובים ביותר לקישור הטבלאות
      const newComment = await addComment({
        postId,
        userId: user.id,
        // אנחנו שולחים גם שם ואימייל כדי שהשרת יוכל להחזיר אותם מיד לתצוגה
        name: user.name || user.username, 
        email: user.email,
        body: text.trim(),
      });

      onCommentAdded(newComment);
      setText(""); // איפוס השדה לאחר הצלחה
    } catch (err) {
      console.error("Add comment error:", err);
      alert("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-form-container">
      <div className="comment-input-group">
        <input
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
        />
        <button 
          className="add-comment-btn" 
          onClick={submit} 
          disabled={loading || !text.trim()}
        >
          {loading ? "..." : "Post"}
        </button>
      </div>
    </div>
  );
}