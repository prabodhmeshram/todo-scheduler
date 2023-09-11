import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../store/todos";

export default function TodoCard(props) {
  const { todo } = props;
  const { title, tasks } = todo;

  const dispatch = useDispatch();

  const checkWhatChanged = (id, isCompleted) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted };
      }
      return task;
    });

    dispatch(updateTodo({ ...todo, tasks: updatedTask }));
  };

  return (
    <Card className="mt-6 w-96">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-16 place-items-center"
      >
        <Typography variant="h3" color="white">
          {title}
        </Typography>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col">
          {tasks.map((task) => (
            <Checkbox
              key={task.id}
              id="ripple-on"
              label={task.text}
              checked={task.isCompleted}
              ripple={true}
              onChange={(ev) => checkWhatChanged(task.id, !task.isCompleted)}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
