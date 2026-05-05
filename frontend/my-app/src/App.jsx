import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import { UserProvider } from './Hooks/UserContext.jsx';
import Login from './Pages/LoginRegister/Login.jsx';
import Register from './Pages/LoginRegister/Register.jsx';
import Home from './Pages/Home/Home.jsx';
import Welcome from "./Pages/Home/Welcome.jsx";
import Todos from './Pages/Home/Todos/Todos.jsx';
import Posts from './Pages/Home/Posts/Posts.jsx';
import Info from './Pages/Home/Info.jsx';
import './App.css';

function App() {
  return (
    <UserProvider>
      <div className="main-app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/users/:name/*" element={<Home />}>
              <Route path="home" element={<Welcome />} />
              <Route path="info" element={<Info />} /> 
              <Route path="todos" element={<Todos />} />
              <Route path="posts" element={<Posts />} />
              <Route index element={<Welcome />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;


