import React from "react";
import { useDispatch } from "react-redux";
import { openModal, setEditTodo } from "../store/todos";

export default function TimeSlot(props) {
  const { slot } = props;
  const dispatch = useDispatch();

  const onEditTodo = (id) => {
    dispatch(setEditTodo({ id }));
    dispatch(openModal({ open: true }));
  };

  let todoElement = "";
  if (slot.todo) {
    const { width } = slot.todo;
    todoElement = (
      <div
        style={{ width: `${width}px` }}
        className="todo-item"
        onClick={(event) => onEditTodo(slot.todo.id)}
      >
        {slot.todo.title}
      </div>
    );
  }

  return (
    <div id={slot.id} className="todo-slot">
      {todoElement}
    </div>
  );
}
