import React, { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: input.trim(),
        done: false,
      };
      setTodos((prev) => [...prev, newTodo]);
      setInput('');
    }
  };

  const toggleDone = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Add a task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="task-input"
      />
      <button onClick={addTodo} aria-label="add-button">Add</button>

      {todos.length === 0 ? (
        <p data-testid="empty-message">No tasks yet.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                data-testid="todo-text"
                style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
              >
                {todo.text}
              </span>
              <button onClick={() => toggleDone(todo.id)} aria-label={`toggle-${todo.id}`}>
                {todo.done ? 'Undo' : 'Done'}
              </button>
              <button onClick={() => removeTodo(todo.id)} aria-label={`remove-${todo.id}`}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
