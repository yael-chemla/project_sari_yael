import PostItem from "./PostItem";

export default function PostList({ posts, onUpdated, onDeleted }) {
  
  // טיפול במצב שבו אין פוסטים (למשל אחרי חיפוש או סינון ל"פוסטים שלי")
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
          key={post.id} // המזהה הייחודי מה-MySQL
          post={post}
          onUpdated={onUpdated} 
          onDeleted={onDeleted}
        />
      ))}
    </ul>
  );
}