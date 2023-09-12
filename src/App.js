import { useSelector } from "react-redux";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import { selectLogin } from "./store/auth";
import LoginPage from "./Pages/LoginPage";
import { isUserLoggedIn } from "./utils/auth";

function App() {
  let isLoggedIn = useSelector(selectLogin);
  isLoggedIn = isLoggedIn || isUserLoggedIn();

  return (
    <div className="App">
      {isLoggedIn ? <Dashboard></Dashboard> : <LoginPage></LoginPage>}
    </div>
  );
}

export default App;
