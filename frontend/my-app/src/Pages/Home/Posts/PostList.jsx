import PostItem from "./PostItem";

export default function PostList({ posts, onUpdated, onDeleted }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="no-posts-message">
        <p>No posts found. Why not be the first to share something?</p>
      </div>
    );
  }

  return (
    <ul className="post-list">
      {posts.map(post => (
        <PostItem
          key={post.id} 
          post={post}
          onUpdated={onUpdated} 
          onDeleted={onDeleted}
        />
      ))}
    </ul>
  );
}