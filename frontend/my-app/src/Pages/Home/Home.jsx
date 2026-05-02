import { Outlet, useParams } from "react-router-dom";
import { useContext } from "react";
import Header from "../Home/Header.jsx"; // וודא שיש לך Header שמכיל לינקים
import { UserContext } from "../../Hooks/UserContext.jsx";

export default function Home() {
  const { user } = useContext(UserContext);
  const { name } = useParams(); // מושך את השם מה-URL

  return (
    <div className="home-container">
      <Header />
      <main className="main-content" style={{ padding: "20px" }}>
        <h1>Welcome, {name}</h1>
        <Outlet />
      </main>
    </div>
  );
}