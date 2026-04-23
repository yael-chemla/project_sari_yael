import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Hooks/UserContext";
import { getPosts } from "../../../API/posts";
import PostFilter from "./PostFilter";
import PostList from "./PostList";
import PostForm from "./PostForm";
import "../../../CSS/Posts.css";

export default function Posts() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState({
    value: "",
    type: "title",
  });

  const [postsScope, setPostsScope] = useState("all"); // all | mine

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        // ב-MySQL אנחנו רוצים לוודא שהפוסטים מסודרים לפי ID יורד (חדש למעלה) 
        // או לפי הדרישה הספציפית של שלב ה' (לפי ID עולה)
        setPosts(data);
      } catch (err) {
        console.error("Load posts error:", err);
        alert("Failed to load posts");
      }
    }
    loadPosts();
  }, []);

  // עדכון ה-State מיד עם הוספת פוסט חדש (Optimistic UI)
  const handleAddState = (newPost) =>
    setPosts((prev) => [newPost, ...prev]);

  const handleDeleteState = (id) =>
    setPosts((prev) => prev.filter((p) => p.id !== id));

  const handleUpdateState = (updatedPost) =>
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );

  // לוגיקת הסינון
  const filteredPosts = posts
    .filter((post) =>
      postsScope === "mine"
        ? Number(post.userId) === Number(user?.id)
        : true
    )
    .filter((post) => {
      if (!search.value) return true;

      if (search.type === "id") {
        return post.id.toString().includes(search.value);
      }

      return post.title
        ?.toLowerCase()
        .includes(search.value.toLowerCase());
    })
    // שלב ה' דורש מיון לפי ID
    .sort((a, b) => a.id - b.id);

  return (
    <div className="posts-layout">
      <main className="posts-content">
        <header className="posts-header">
           <h2>Posts Feed</h2>
           <span className="post-count">Showing {filteredPosts.length} posts</span>
        </header>
        
        <PostList
          posts={filteredPosts}
          onDeleted={handleDeleteState}
          onUpdated={handleUpdateState}
        />
      </main>

      <aside className="posts-sidebar">
        <div className="posts-search-box">
          <h3>Filter & Search</h3>
          <PostFilter
            search={search}
            setSearch={setSearch}
            postsScope={postsScope}
            setPostsScope={setPostsScope}
          />
        </div>

        <div className="posts-add-box">
          <PostForm onPostAdded={handleAddState} />
        </div>
      </aside>
    </div>
  );
}