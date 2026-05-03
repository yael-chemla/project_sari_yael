// import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from './Routes/ProtectedRoute.jsx';
// import { UserProvider } from './Hooks/UserContext.jsx';
// import Login from './Pages/LoginRegister/Login.jsx';
// import Register from './Pages/LoginRegister/Register.jsx';
// import Home from './Pages/Home/Home.jsx';
// import Welcome from "./Pages/Home/Welcome.jsx";
// import Todos from './Pages/Home/Todos/Todos.jsx';
// import Posts from './Pages/Home/Posts/Posts.jsx';
// import Info from './Pages/Home/Info.jsx';

// function App() {
//   return (
//     <UserProvider>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route element={<ProtectedRoute />}>
//           {/* :name מייצג את החלק האינפורמטיבי ב-URL */}
//           <Route path="/users/:name" element={<Home />}>
//             <Route path="home" element={<Welcome />} />
//             <Route path="info" element={<Info />} /> 
//             <Route path="todos" element={<Todos />} />
//             <Route path="posts" element={<Posts />} />
//           </Route>
//         </Route>
//       </Routes>
//     </UserProvider>
//   );
// }

// export default App;
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

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          {/* שינוי כאן: הוספנו * בסוף הנתיב כדי לאפשר תתי-נתיבים */}
          <Route path="/users/:name/*" element={<Home />}>
            {/* נתיב ברירת מחדל בתוך Home */}
            <Route index element={<Welcome />} /> 
            
            {/* שינוי כאן: מבנה של home/posts כפי שמופיע בשגיאה שלך */}
            <Route path="home" element={<Welcome />}>
                <Route path="posts" element={<Posts />} />
                <Route path="todos" element={<Todos />} />
            </Route>
            
            <Route path="info" element={<Info />} />
          </Route>
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;