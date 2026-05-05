import { useState } from "react";
import { deleteComment, updateComment } from "../../../../API/posts";

export default function CommentItem({ comment, canEdit, onDeleted, onUpdated }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(comment.body);
  const [isProcessing, setIsProcessing] = useState(false);

const handleSave = async () => {
    if (!text.trim()) {
      alert("Comment body cannot be empty");
      return;
    }
    try {
        setIsProcessing(true);        
        const updated = await updateComment(comment.id, text.trim());
        onUpdated(updated);
        setEdit(false);
    } catch (err) {
        alert("Failed to update comment");
    } finally {
        setIsProcessing(false);
    }
};

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      setIsProcessing(true);
      await deleteComment(comment.id);
      onDeleted(comment.id);
    } catch (err) {
      alert("Failed to delete comment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`comment-card ${isProcessing ? "processing" : ""}`}>
      <div className="comment-header">
        <span className="comment-author">{comment.email || "Anonymous"}</span>
      </div>

      {edit ? (
        <div className="comment-edit-mode">
          <input 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            autoFocus
            disabled={isProcessing}
          />
          <div className="comment-actions">
            <button onClick={handleSave} disabled={isProcessing}>
              {isProcessing ? "..." : "Update"}
            </button>
            <button 
              onClick={() => { setEdit(false); setText(comment.body); }} 
              disabled={isProcessing}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-view-mode">
          <div className="comment-body">{comment.body}</div>
          
          {canEdit && (
            <div className="comment-actions">
              <button onClick={() => setEdit(true)} title="Edit">✏️</button>
              <button onClick={handleDelete} title="Delete">🗑️</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}