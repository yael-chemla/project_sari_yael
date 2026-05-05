import { Outlet, useParams } from "react-router-dom";
import { useContext } from "react";
import Header from "../Home/Header.jsx";
import { UserContext } from "../../Hooks/UserContext.jsx";

export default function Home() {
  // const { user } = useContext(UserContext);
  // const { name } = useParams();
  return (
    <div className="home-container">
      <Header />
      <main className="main-content" style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}