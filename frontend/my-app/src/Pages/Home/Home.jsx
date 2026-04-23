import { Outlet, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import Header from "../Home/Header.jsx";
import { UserContext } from "../../Hooks/UserContext.jsx";

export default function Home() {
  const { user } = useContext(UserContext);
  const { id } = useParams(); // ה-ID שמגיע מה-URL

  // אופציונלי: בדיקה בטיחותית שהמשתמש ב-URL הוא אכן המשתמש המחובר
  useEffect(() => {
    if (user && id && user.id.toString() !== id.toString()) {
      console.warn("User ID mismatch!");
      // כאן אפשר להוסיף לוגיקה של ניתוב מחדש אם רוצים אבטחה מחמירה
    }
  }, [id, user]);

  return (
    <div className="home-container">
      {/* ה-Header יקבל את פרטי המשתמש מה-Context באופן אוטומטי */}
      <Header />
      
      <main className="main-content" style={{ padding: "20px" }}>
        {/* כאן ירונדרו הדפים הפנימיים: Todos, Posts, Info וכו' */}
        <Outlet />
      </main>
    </div>
  );
}