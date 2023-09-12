import { useSelector } from "react-redux";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import { selectLogin } from "./store/auth";
import LoginPage from "./Pages/LoginPage";

function App() {
  const isLoggedIn = useSelector(selectLogin);

  return (
    <div className="App">
      {isLoggedIn ? <Dashboard></Dashboard> : <LoginPage></LoginPage>}
    </div>
  );
}

export default App;
