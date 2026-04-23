import TodoItem from "./TodoItem";

export default function TodoList({ todos, onUpdated, onDeleted }) {
  // אם אין מטלות (למשל אחרי סינון או כשהמשתמש חדש)
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No todos found. Time to add some tasks!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // חשוב מאוד לעבודה תקינה מול MySQL
          todo={todo}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
        />
      ))}
    </div>
  );
}