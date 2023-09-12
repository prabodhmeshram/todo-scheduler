import Header from "../Components/Header";
import Footer from "../Components/Footer";
import TodoContainer from "../Components/TodoContainer";
import AddTodo from "../Components/AddTodo";
import TodoList from "../Components/TodoList";

export default function Dashboard() {
  return (
    <div>
      <Header></Header>
      <div>
        <div className="mt-16">
          <AddTodo></AddTodo>
          <TodoContainer className="todo-container"></TodoContainer>
          <TodoList></TodoList>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
