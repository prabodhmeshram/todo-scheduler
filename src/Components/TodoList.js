import React from "react";
import { useSelector } from "react-redux";
import { selectTodo } from "../store/todos";
import TodoCard from "./TodoCard";

export default function TodoList() {
  const todos = useSelector(selectTodo);

  return (
    <div className="my-8 flex items-center">
      {todos.length > 0 ? (
        todos.map((todo) => <TodoCard key={todo.id} todo={todo}></TodoCard>)
      ) : (
        <div className="no-todos mt-16">
          Add some todos, nothing to show right now
        </div>
      )}
    </div>
  );
}
