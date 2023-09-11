import Header from "../Components/Header";
import Footer from "../Components/Footer";
import dayjs from "../plugins/dayjs";
import TodoContainer from "../Components/TodoContainer";
import AddTodo from "../Components/AddTodo";

export default function Dashboard() {
  const currentDate = dayjs();

  return (
    <div>
      <Header></Header>
      <div>
        Hello This is my Content {currentDate.toString()}
        <div className="mt-16">
          <AddTodo></AddTodo>
          <TodoContainer className="todo-container"></TodoContainer>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
