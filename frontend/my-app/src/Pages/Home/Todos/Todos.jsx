import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Hooks/UserContext.jsx";
import { getTodosByUser } from "../../../API/todos";
import TodoList from "./TodosList.jsx";
import TodoForm from "./TodoForm.jsx";
import TodoFilter from "./TodoFilter";
import "../../../CSS/Todos.css";

export default function Todos() {
  const { user } = useContext(UserContext);
  const userId = user?.id;

  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState({
    value: "",
    type: "title", 
  });
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    async function loadTodos() {
      if (!userId) return;
      try {
        const data = await getTodosByUser(userId);
        setTodos(data);
      } catch (err) {
        console.error("Load todos error:", err);
        alert("Failed to load todos from server");
      }
    }
    loadTodos();
  }, [userId]); // הוספת userId כתלות

  // פונקציות לעדכון ה-State המקומי (Optimistic UI/Sync)
  const handleAddState = (newTodo) =>
    setTodos((prev) => [...prev, newTodo]);

  const handleDeletedState = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const handleUpdatedState = (updated) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );

  // לוגיקת סינון ומיון בצד הלקוח
  const filteredTodos = todos
    .filter((todo) => {
      if (!search.value) return true;
      if (search.type === "id") {
        return todo.id.toString().includes(search.value);
      }
      return todo.title?.toLowerCase().includes(search.value.toLowerCase());
    })
    .filter((todo) => {
      // המרה ל-Boolean למקרה שה-SQL מחזיר 0 או 1
      const isCompleted = !!todo.completed; 
      if (filter === "completed") return isCompleted;
      if (filter === "uncompleted") return !isCompleted;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "completed") return !!a.completed - !!b.completed;
      
      // מיון לפי ID מספרי (המרצה ביקש מיון לפי ID כברירת מחדל)
      return a.id - b.id; 
    });

  return (
    <div className="todos-container">
      <header className="todos-header">
        <h2>My Todos</h2>
        <p>Total: {filteredTodos.length} items</p>
      </header>

      <TodoFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <TodoForm onAdded={handleAddState} />

      <TodoList
        todos={filteredTodos}
        onDeleted={handleDeletedState}
        onUpdated={handleUpdatedState}
      />
    </div>
  );
}