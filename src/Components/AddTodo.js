import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import { openModal } from "../store/todos";
import { AddTodoModal } from "./AddTodoModal";

export default function AddTodo() {
  const dispatch = useDispatch();

  const openTodoModal = () => {
    dispatch(openModal({ open: true }));
  };

  return (
    <div className="add-todo-container flex flex-row-reverse my-8">
      <div className="add-todo mr-12">
        <Button
          onClick={openTodoModal}
          color="light-blue"
          className="px-4 text-md"
        >
          <AddCircleOutlineRoundedIcon fontSize="large" /> Add Todo
        </Button>
        <AddTodoModal></AddTodoModal>
      </div>
    </div>
  );
}
