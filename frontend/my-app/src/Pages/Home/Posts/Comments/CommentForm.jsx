import { useState, useContext } from "react";
import { UserContext } from "../../../../Hooks/UserContext";
import { addComment } from "../../../../API/posts";

export default function CommentForm({ postId, onCommentAdded }) {
  const { user } = useContext(UserContext);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
        const newComment = await addComment({
        postId,
        userId: user.id,
        name: user.name || user.username, 
        email: user.email,
        body: text.trim(),
      });

      onCommentAdded(newComment);
      setText("");
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