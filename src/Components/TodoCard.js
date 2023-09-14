import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { DeleteOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../store/todos";

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

  const onDeleteTodo = (id) => {
    dispatch(deleteTodo({ id }));
  };

  return (
    <Card className="mt-6 mx-2 w-96 bg-blue-100">
      <CardBody>
        <Typography
          variant="h5"
          className="flex mb-2 align-left items-start underline"
        >
          {title}
        </Typography>
        <div className="flex flex-col items-start">
          {tasks.map((task) => (
            <div key={task.id}>
              <div>
                <Checkbox
                  label={
                    <span
                      className={`${
                        task.isCompleted ? "line-through" : ""
                      } font-bold`}
                    >
                      {task.text}
                    </span>
                  }
                  checked={task.isCompleted}
                  ripple={true}
                  onChange={() => updateTaskState(task.id, !task.isCompleted)}
                />
                <DeleteOutline
                  className="ml-2 mb-2"
                  onClick={() => deleteTask(task.id)}
                  color="error"
                ></DeleteOutline>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={() => onDeleteTodo(todo.id)}
          color="red"
          variant="gradient"
          fullWidth
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
