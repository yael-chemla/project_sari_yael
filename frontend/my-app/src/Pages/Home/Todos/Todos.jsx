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
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({ value: "", type: "title" });
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    async function loadTodos() {
      try {
        setLoading(true);
        const data = await getTodosByUser(userId);
        setTodos(Array.isArray(data) ? data : []); 
      } catch (err) {
        console.error("Fetch error details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (!search.value) return true;
    return search.type === "id"
      ? todo.id.toString().includes(search.value)
      : todo.title?.toLowerCase().includes(search.value.toLowerCase());
  }).filter(todo => {
    const isCompleted = !!todo.completed;
    if (filter === "completed") return isCompleted;
    if (filter === "uncompleted") return !isCompleted;
    return true;
  }).sort((a, b) => sortBy === "title" ? a.title.localeCompare(b.title) : a.id - b.id);

  return (
    <div className="todos-container">
      <header className="todos-header">
        <h2>My Todos</h2>
        {loading && <p>Loading tasks...</p>}
      </header>

      <TodoFilter search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy} />
      <TodoForm onAdded={(newTodo) => setTodos(prev => [...prev, newTodo])} />
      <TodoList
        todos={filteredTodos}
        onDeleted={(id) => setTodos(prev => prev.filter(t => t.id !== id))}
        onUpdated={(updated) => {
          setTodos(prev => prev.map(t => t.id === updated.id ? updated : t));
        }}
      />    </div>
  );
}