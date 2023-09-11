import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import {
  addTodo,
  openModal,
  selectEditTodo,
  selectModalState,
  selectTodo,
  setEditTodo,
  updateTodo,
} from "../store/todos";
import { useDispatch, useSelector } from "react-redux";
import { generateSlots } from "../utils/slots";
import { checkIfTodoSlotAvailable, generateId } from "../utils/todos";

export function AddTodoModal(props) {
  const open = useSelector(selectModalState);
  const existingTodos = useSelector(selectTodo);
  const editTodoId = useSelector(selectEditTodo);

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (editTodoId !== "") {
      const editTodo = existingTodos.find((todo) => todo.id === editTodoId);
      const { title, startTime, endTime } = editTodo;
      setTitle(title);
      setStartTime(startTime);
      setEndTime(endTime);
    }
  }, [editTodoId]);

  const inputObj = {
    text: "",
  };
  const [tasks, setTasks] = useState([inputObj]);
  const addEntryClick = () => {
    setTasks((oldArray) => [...oldArray, inputObj]);
  };

  const deleteInput = (index) => {
    setTasks((arr) => {
      arr.splice(index, 1);
      return [...arr];
    });
  };

  const handleChange = (e, targetIndex) => {
    setTasks(
      tasks.map((item, index) =>
        index === targetIndex ? { ...item, text: e.target.value } : item
      )
    );
  };

  const handleSave = () => {
    const unableToAdd = checkIfTodoSlotAvailable(
      startTime,
      endTime,
      existingTodos,
      editTodoId
    );
    if (unableToAdd) {
      console.log("Conflict Found", unableToAdd);
    } else {
      if (editTodoId !== "") {
        dispatch(
          updateTodo({ title, startTime, endTime, tasks, id: editTodoId })
        );
      } else {
        dispatch(
          addTodo({ title, startTime, endTime, tasks, id: generateId() })
        );
      }
      resetState();
      dispatch(openModal({ open: false }));
    }
  };

  const handleClose = () => {
    resetState();
    dispatch(openModal({ open: false }));
  };

  // Resetting the state to old values
  const resetState = () => {
    setTasks([inputObj]);
    setTitle("");
    setStartTime("");
    setEndTime("");
    dispatch(setEditTodo({ id: "" }));
  };

  const slots = generateSlots();
  const dispatch = useDispatch();

  return (
    <>
      <Dialog open={open}>
        <DialogHeader>Add a Todo</DialogHeader>
        <DialogBody divider>
          <Input
            label="Add Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Select
            value={startTime}
            label="Select Start Time"
            onChange={setStartTime}
          >
            {slots.map((slot, index) => (
              <Option key={index} value={slot.startTime}>
                {slot.startTime}
              </Option>
            ))}
          </Select>
          <Select value={endTime} label="Select End Time" onChange={setEndTime}>
            {slots.map((slot, index) => (
              <Option key={index} value={slot.endTime}>
                {slot.endTime}
              </Option>
            ))}
          </Select>
          <h2>Add tasks</h2>
          <div>
            {tasks.map((entry, index) => (
              <div key={index} className="flex">
                <Input
                  value={entry.text}
                  label="Add Task"
                  onChange={(e) => handleChange(e, index)}
                />
                <Button onClick={() => deleteInput(index)}>Delete</Button>
              </div>
            ))}
          </div>
          <Button onClick={addEntryClick}>Add More</Button>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSave}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
