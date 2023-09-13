import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, openModal, setEditTodo } from "../store/todos";
import { Delete, Edit } from "@mui/icons-material";
import { getHour, getTimeSlotString } from "../utils/todos";

export default function TimeSlot(props) {
  const { slot } = props;
  const dispatch = useDispatch();

  const onEditTodo = (todo) => {
    dispatch(setEditTodo({ todo }));
    dispatch(openModal({ open: true }));
  };

  const onDeleteTodo = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const truncateTitle = (title) => {
    return title.length <= 20 ? title : title.substring(0, 20) + "...";
  };

  const slotTime = (
    <div className="-mt-6 text-sm text-left text-gray-500">
      {getHour(slot.startTime)}
    </div>
  );

  let todoElement = "";
  if (slot.todo) {
    const { width } = slot.todo;

    todoElement = (
      <>
        {slotTime}
        <div
          style={{ width: `${width}px` }}
          className="todo-item flex flex-col justify-start text-sm"
        >
          <div className="my-2 text-base font-bold">
            {truncateTitle(slot.todo.title)}
          </div>
          <div>{getTimeSlotString(slot.todo.startTime, slot.todo.endTime)}</div>
          <div className="my-4">
            Number of tasks <strong>{slot.todo.tasks.length}</strong>
          </div>
          <div className="ml-5 mt-5 my-3 flex flex-row gap-5">
            <Edit
              onClick={() => onEditTodo(slot.todo)}
              fontSize="medium"
              className="cursor-pointer"
            ></Edit>
            <Delete
              onClick={() => onDeleteTodo(slot.todo.id)}
              fontSize="medium"
              className="cursor-pointer"
            ></Delete>
          </div>
        </div>
      </>
    );
  } else {
    todoElement = <>{slotTime}</>;
  }

  return (
    <div id={slot.id} className="todo-slot">
      {todoElement}
    </div>
  );
}
