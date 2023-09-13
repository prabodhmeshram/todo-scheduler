import React from "react";
import { useSelector } from "react-redux";
import { selectTodo } from "../store/todos";
import TodoCard from "./TodoCard";

export default function TodoList() {
  const todos = useSelector(selectTodo);

  return (
    <div className="my-14 flex flex-row justify-items-start">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo.id}>
            <TodoCard todo={todo}></TodoCard>
          </div>
        ))
      ) : (
        <div className="no-todos mt-16">
          Add some todos, nothing to show right now 😀
        </div>
      )}
    </div>
  );
}
