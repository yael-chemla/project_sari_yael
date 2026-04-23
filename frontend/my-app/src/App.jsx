//שונה
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import { UserProvider } from './Hooks/UserContext.jsx';

// CSS
import './App.css';

// Pages
import Login from './Pages/LoginRegister/Login.jsx';
import Register from './Pages/LoginRegister/Register.jsx';
import RegisterComplete from './Pages/LoginRegister/RegisterComplete.jsx';
import Home from './Pages/Home/Home.jsx';
import Welcome from "./Pages/Home/Welcome.jsx";
import Todos from './Pages/Home/Todos/Todos.jsx';
import Posts from './Pages/Home/Posts/Posts.jsx';
import Info from './Pages/Home/Info.jsx'; // ודאי שקיים קומפוננט כזה לפרטי המשתמש

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* נתיב ברירת מחדל - שולח ללוגין אם אין משתמש */}
        <Route path="/" element={<Navigate middle to="/login" replace />} />
        
        {/* נתיבים ציבוריים */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* נתיבים מוגנים - רק למשתמש מחובר */}
        <Route element={<ProtectedRoute />}>
          
          {/* עמוד השלמת רישום - נשאר עם ID כי הוא זמני */}
          <Route path="/registercomplete/:id" element={<RegisterComplete />} />

          {/* ה-URL האינפורמטיבי המבוקש: /users/shlomo/home */}
          <Route path="/users/:username" element={<Home />}>
            <Route path="home" element={<Welcome />} />
            <Route path="info" element={<Info />} /> 
            <Route path="todos" element={<Todos />} />
            <Route path="posts" element={<Posts />} />
            {/* ניתן להוסיף כאן גם comments אם תרצי עמוד נפרד */}
          </Route>

        </Route>

        {/* עמוד שגיאה 404 */}
        <Route path="*" element={
          <div style={{ padding: "50px", textAlign: "center" }}>
            <h1>404 - Page Not Found</h1>
            <p>הדף שחיפשת לא קיים במערכת.</p>
          </div>
        } />
      </Routes>
    </UserProvider>
  );
}

export default App;