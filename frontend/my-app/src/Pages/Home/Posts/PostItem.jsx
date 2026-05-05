import { useState } from "react";
import PostDetails from "./PostDetails";

export default function PostItem({ post, onUpdated, onDeleted }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={`post-card ${open ? "open" : ""}`}>
      {!open ? (
        <div
          className="post-summary"
          onClick={() => setOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <span className="post-id">#{post.id}</span>
          <strong className="post-title-text"> {post.title}</strong>
        
          <span className="view-more">  Click to view details...</span>
        </div>
      ) : (
        <PostDetails
          post={post}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
          onClose={() => setOpen(false)}
        />
      )}
    </li>
  );
}