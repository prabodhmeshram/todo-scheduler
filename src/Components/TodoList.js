import React from "react";
import { useSelector } from "react-redux";
import { selectTodo } from "../store/todos";
import TodoCard from "./TodoCard";

export default function TodoList() {
  const todos = useSelector(selectTodo);

  return (
    <div className="mt-8 flex">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo}></TodoCard>
      ))}
    </div>
  );
}
