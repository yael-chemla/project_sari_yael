import CommentItem from "./CommentItem.jsx";
import { useContext } from "react";
import { UserContext } from "../../../../Hooks/UserContext.jsx";

export default function CommentList({ comments = [], onDeleted, onUpdated }) {
  const { user } = useContext(UserContext);

  return (
    <div className="comment-list">
      {/* הצגת הודעה במידה ואין תגובות */}
      {comments.length === 0 ? (
        <p className="empty-msg">No comments yet. Be the first to react!</p>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            /* בדיקת הרשאות: 
               ב-MySQL עדיף להשוות userId (מספר) כי אימייל יכול להשתנות, 
               אבל אם השרת מחזיר אימייל בכל תגובה, הבדיקה שלך תעבוד מצוין.
            */
            canEdit={Number(comment.userId) === Number(user?.id) || comment.email === user?.email}
            onDeleted={onDeleted}
            onUpdated={onUpdated}
          />
        ))
      )}
    </div>
  );
}