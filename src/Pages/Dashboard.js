import Header from "../Components/Header";
import Footer from "../Components/Footer";
import TodoContainer from "../Components/TodoContainer";
import AddTodo from "../Components/AddTodo";
import TodoList from "../Components/TodoList";
import dayjs from "../plugins/dayjs";
import { Typography, Spinner, Card, CardBody } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectFetchStatus, selectTodo } from "../store/todos";
import { getPendingAndCompleteTasks } from "../utils/todos";
import { useEffect } from "react";

export default function Dashboard() {
  const today = dayjs().format("MMMM D, YYYY");

  const dispatch = useDispatch();
  const todos = useSelector(selectTodo);
  const todoFetchStatus = useSelector(selectFetchStatus);

  useEffect(() => {
    if (todoFetchStatus === "idle") {
      dispatch(fetchTodos());
    }
  }, [todoFetchStatus, dispatch]);

  const numberOfTodos = todos.length;
  const [pendingTasks, completedTasks] = getPendingAndCompleteTasks(todos);

  return (
    <div>
      <Header></Header>
      <div>
        <div className="mt-6">
          <div className="flex justify-around mb-12">
            <div className="text-3xl ml-10"> {today}</div>
            <div className="flex gap-10 item-center justify-center text-sm font-bold">
              <Card className="w-36 bg-light-blue-100">
                <CardBody>
                  <Typography variant="h4">{numberOfTodos}</Typography>
                  Todos
                </CardBody>
              </Card>
              <Card className="w-36 bg-red-100">
                <CardBody>
                  <Typography variant="h4">{pendingTasks}</Typography>
                  Pending Tasks
                </CardBody>
              </Card>
              <Card className="w-36 bg-light-green-100">
                <CardBody>
                  <Typography variant="h4">{completedTasks}</Typography>
                  Completed Tasks
                </CardBody>
              </Card>
            </div>
            <AddTodo></AddTodo>
          </div>
          <TodoContainer className="todo-container"></TodoContainer>
          {todoFetchStatus === "succeeded" ? (
            <TodoList></TodoList>
          ) : (
            <div className="flex no-todos justify-center mt-16">
              ⏳ Fetching your todos, Hang in there ⏳
              <Spinner className="ml-6 h-12 w-12" />
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
