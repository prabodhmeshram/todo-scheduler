import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos";
import authReducer from "./auth";

export default configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
  },
});
