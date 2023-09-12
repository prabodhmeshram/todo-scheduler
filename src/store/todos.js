import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    value: [],
    isModalOpen: false,
    editTodoId: "",
  },
  reducers: {
    addTodo: (state, action) => {
      // Add a new todo
      state.value = [...state.value, { ...action.payload }];
    },
    openModal: (state, action) => {
      state.isModalOpen = action.payload.open;
    },
    setEditTodo: (state, action) => {
      state.editTodoId = action.payload.id;
    },
    updateTodo: (state, action) => {
      state.value = state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          // if (todo.id === state.editTodoId) {
          return action.payload;
        }
        return todo;
      });
    },
    deleteTodo: (state, action) => {
      state.value = state.value.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, openModal, setEditTodo, updateTodo, deleteTodo } =
  todosSlice.actions;

// selectors for todo specific values
export const selectTodo = (state) => state.todos.value;
export const selectModalState = (state) => state.todos.isModalOpen;
export const selectEditTodo = (state) => state.todos.editTodoId;

export default todosSlice.reducer;
