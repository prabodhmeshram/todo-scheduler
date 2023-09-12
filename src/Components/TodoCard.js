import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { updateTodo } from "../store/todos";

export default function TodoCard(props) {
  const { todo } = props;
  const { title, tasks } = todo;

  const dispatch = useDispatch();

  const updateTaskState = (id, isCompleted) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted };
      }
      return task;
    });

    dispatch(updateTodo({ ...todo, tasks: updatedTasks }));
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    dispatch(updateTodo({ ...todo, tasks: remainingTasks }));
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
        <div className="flex flex-col items-start">
          {tasks.map((task) => (
            <div key={task.id}>
              <Checkbox
                label={
                  <span
                    className={`${task.isCompleted ? "line-through" : ""} `}
                  >
                    {task.text}
                  </span>
                }
                checked={task.isCompleted}
                ripple={true}
                onChange={(ev) => updateTaskState(task.id, !task.isCompleted)}
              />
              <div className="ml-10 inline">
                <DeleteIcon
                  onClick={() => deleteTask(task.id)}
                  color="error"
                ></DeleteIcon>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
