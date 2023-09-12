import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, openModal, setEditTodo } from "../store/todos";
import { Delete, Edit } from "@mui/icons-material";

export default function TimeSlot(props) {
  const { slot } = props;
  const dispatch = useDispatch();

  const onEditTodo = (id) => {
    dispatch(setEditTodo({ id }));
    dispatch(openModal({ open: true }));
  };

  const onDeleteTodo = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const truncateTitle = (title) => {
    return title.substring(0, 20) + "...";
  };

  let todoElement = "";
  if (slot.todo) {
    const { width } = slot.todo;
    todoElement = (
      <div style={{ width: `${width}px` }} className="todo-item">
        <div className="p-5">{truncateTitle(slot.todo.title)}</div>
        <div>
          Number of tasks <strong>{slot.todo.tasks.length}</strong>
        </div>
        <div className="mr-5 cursor-pointer mt-5">
          <div className="my-3">
            <Edit
              onClick={() => onEditTodo(slot.todo.id)}
              fontSize="medium"
            ></Edit>
          </div>
          <div className="my-3">
            <Delete
              onClick={() => onDeleteTodo(slot.todo.id)}
              fontSize="medium"
            ></Delete>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id={slot.id} className="todo-slot">
      {todoElement}
    </div>
  );
}
