import Header from "../Components/Header";
import Footer from "../Components/Footer";
import TodoContainer from "../Components/TodoContainer";
import AddTodo from "../Components/AddTodo";
import TodoList from "../Components/TodoList";
import dayjs from "../plugins/dayjs";
import { Badge, Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { selectTodo } from "../store/todos";
import { getPendingAndCompleteTasks } from "../utils/todos";

export default function Dashboard() {
  const today = dayjs().format("MMMM D, YYYY");

  const todos = useSelector(selectTodo);

  const numberOfTodos = todos.length;
  const [pendingTasks, completedTasks] = getPendingAndCompleteTasks(todos);

  return (
    <div>
      <Header></Header>
      <div>
        <div className="mt-16">
          <div className="text-3xl text-left ml-10"> {today}</div>
          <div className="flex gap-10 item-center justify-center">
            <Badge content={numberOfTodos}>
              <Button color="blue">Todos</Button>
            </Badge>
            <Badge content={pendingTasks}>
              <Button color="orange">Pending Tasks</Button>
            </Badge>
            <Badge content={completedTasks}>
              <Button color="green">Completed Tasks</Button>
            </Badge>
          </div>
          <AddTodo></AddTodo>
          <TodoContainer className="todo-container"></TodoContainer>
          <TodoList></TodoList>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
