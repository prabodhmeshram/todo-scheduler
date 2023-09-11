import React from "react";
import Tasks from "./Tasks";

export default function Todo(props) {
  const { title, tasks } = props;

  return (
    <div className="todo-item">
      {title}
      <div>
        <Tasks tasks={tasks}></Tasks>
      </div>
    </div>
  );
}
