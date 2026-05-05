import { useState, useEffect, useContext } from "react";
import CommentS from "./Comments/Comment"; 
import { updatePost, deletePost } from '../../../API/posts';
import { UserContext } from "../../../Hooks/UserContext.jsx";

export default function PostDetails({ post, onUpdated, onDeleted, onClose }) {
  const { user } = useContext(UserContext);
  const userId = user?.id;
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
  if (!title.trim() || !body.trim()) {
    alert("Title and body cannot be empty");
    return;
  }
  try {
    const updatedData = { 
      ...post,
      title: title.trim(), 
      body: body.trim() 
    };

   
    const result = await updatePost(post.id, updatedData);
    const finalPost = result?.id ? result : updatedData;

    onUpdated(finalPost); 
    setEdit(false);
  } catch (err) {
    alert("Failed to update post");
  }
};

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post? All comments will be deleted too.")) return;
    
    try {

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
          {canEdit && !edit && (
            <button onClick={() => setEdit(true)}>✏️ Edit</button>
          )}
          
          <button onClick={() => setShowComments(p => !p)}>
            💬 {showComments ? "Hide comments" : "Show comments"}
          </button>
          {canEdit && (
            <button className="danger-btn" onClick={handleDelete}>
              🗑️ Delete
            </button>
          )}

          <button onClick={onClose}>⬆ Close</button>
        </div>
      </div>

      {showComments && <CommentS postId={post.id} />}
    </div>
  );
}