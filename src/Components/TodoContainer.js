import React from "react";
import TimeSlot from "./TimeSlot";
import { useSelector } from "react-redux";
import { selectTodo } from "../store/todos";
import { generateSlots } from "../utils/slots";
import { mapTodosToSlots } from "../utils/todos";
import { AddTodoModal } from "./AddTodoModal";

export default function TodoContainer() {
  const ToDos = useSelector(selectTodo);

  const slots = generateSlots();

  const filledSlots = mapTodosToSlots(ToDos, slots);

  const todoList = filledSlots.map((slot) => (
    <TimeSlot key={slot.id} slot={slot} />
  ));

  return (
    <div className="flex justify-center">
      <div className="flex flex-row  todo-container">{todoList}</div>
      <AddTodoModal></AddTodoModal>
    </div>
  );
}
