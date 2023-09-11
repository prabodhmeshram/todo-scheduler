import React from "react";

export default function Tasks(props) {
  const { tasks } = props;

  if (!tasks) return null;

  const taskList = tasks.map((task, index) => {
    return <li key={index}> {task.title} </li>;
  });

  return <ul>{taskList}</ul>;
}
