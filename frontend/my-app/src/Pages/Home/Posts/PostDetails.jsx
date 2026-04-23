import { useState, useEffect, useContext } from "react";
import CommentS from "./Comments/Comment"; // ודאי שהשם תואם לקומפוננטה שלך
import { updatePost, deletePost } from '../../../API/posts'; // הסרתי את deleteCommentsByPost
import { UserContext } from "../../../Hooks/UserContext.jsx";

export default function PostDetails({ post, onUpdated, onDeleted, onClose }) {
  const { user } = useContext(UserContext);
  const userId = user?.id;

  // בדיקת הרשאות עריכה/מחיקה - רק אם הפוסט שייך למשתמש המחובר
  const canEdit = Number(post.userId) === Number(userId);

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
    setEdit(false);
  }, [post.id, post.title, post.body]);

  const save = async () => {
    if (!title.trim() || !body.trim()) return;
    try {
      // ב-MySQL אנחנו שולחים את המידע המעודכן
      const updated = await updatePost(post.id, { 
        title: title.trim(), 
        body: body.trim(),
        userId: post.userId // שמירה על ה-userId המקורי
      });
      onUpdated(updated);
      setEdit(false);
    } catch (err) {
      alert("Failed to update post");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post? All comments will be deleted too.")) return;
    
    try {
      /**
       * שימי לב: בזכות ה-ON DELETE CASCADE שהגדרת ב-SQL, 
       * אין צורך לקרוא ל-deleteCommentsByPost!
       * ברגע שהשרת ימחק את הפוסט, ה-MySQL ימחק אוטומטית את כל התגובות שלו.
       */
      await deletePost(post.id);
      onDeleted(post.id);
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  return (
    <div className="post-details">
      {edit ? (
        <div className="edit-post-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-title-input"
          />
          <textarea
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="edit-body-textarea"
          />
          <div className="edit-buttons">
            <button onClick={save}>💾 Save</button>
            <button onClick={() => setEdit(false)}>❌ Cancel</button>
          </div>
        </div>
      ) : (
        <div className="post-view">
          <h3>{post.title}</h3>
          <p className="post-body-text" style={{ whiteSpace: "pre-line" }}>
            {post.body}
          </p>
        </div>
      )}

      <div className="post-details-actions">
        <div className="comment-toolbar">
          {/* עריכה מוצגת רק לבעל הפוסט */}
          {canEdit && !edit && (
            <button onClick={() => setEdit(true)}>✏️ Edit</button>
          )}
          
          <button onClick={() => setShowComments(p => !p)}>
            💬 {showComments ? "Hide comments" : "Show comments"}
          </button>

          {/* מחיקה מוצגת רק לבעל הפוסט */}
          {canEdit && (
            <button className="danger-btn" onClick={handleDelete}>
              🗑️ Delete
            </button>
          )}

          <button onClick={onClose}>⬆ Close</button>
        </div>
      </div>

      {/* קומפוננטת התגובות שנטענת רק כשרוצים לראותן */}
      {showComments && <CommentS postId={post.id} />}
    </div>
  );
}