import { useEffect, useState } from "react";
import { getCommentsByPost } from "../../../../API/posts";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function Comment({ postId }) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            if (!postId) return;
            try {
                setIsLoading(true);
                setError(null);
                // שליחת ה-postId לשרת כדי לקבל רק את התגובות הרלוונטיות
                const data = await getCommentsByPost(postId);
                setComments(data);
            } catch (err) {
                console.error("Comments load error:", err);
                setError("Failed to load comments");
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, [postId]);

    // הוספת תגובה חדשה לסוף הרשימה (או לתחילתה)
    const handleAddState = (newComment) => setComments(prev => [...prev, newComment]);
    
    // מחיקת תגובה מה-State
    const handleDeleteState = (id) => setComments(prev => prev.filter(c => c.id !== id));
    
    // עדכון תגובה קיימת
    const handleUpdateState = (updatedComment) => 
        setComments(prev => prev.map(c => 
            c.id === updatedComment.id ? { ...c, ...updatedComment } : c
        ));

    if (error) return <p className="error-msg">{error}</p>;
    if (isLoading && comments.length === 0) return <p className="loading-msg">Loading comments...</p>;

    return (
        <div className="comments-section">
            <h4>Comments ({comments.length})</h4>
            
            {/* טופס הוספת תגובה - מקבל את ה-postId כדי לדעת לאן לשייך ב-SQL */}
            <CommentForm postId={postId} onCommentAdded={handleAddState} />
            
            {comments.length > 0 ? (
                <CommentList
                    comments={comments}
                    onDeleted={handleDeleteState}
                    onUpdated={handleUpdateState}
                />
            ) : (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
}