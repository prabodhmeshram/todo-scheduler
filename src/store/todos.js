import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    value: [],
    isModalOpen: false,
    editTodo: null,
    fetchStatus: "idle",
  },
  reducers: {
    addTodo: (state, action) => {
      // Add a new todo
      state.value = [...state.value, { ...action.payload }];
      saveTodos(state.value);
    },
    openModal: (state, action) => {
      state.isModalOpen = action.payload.open;
    },
    setEditTodo: (state, action) => {
      state.editTodo = action.payload.todo;
    },
    updateTodo: (state, action) => {
      state.value = state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          // if (todo.id === state.editTodoId) {
          return action.payload;
        }
        return todo;
      });
      saveTodos(state.value);
    },
    deleteTodo: (state, action) => {
      state.value = state.value.filter((todo) => todo.id !== action.payload.id);
      saveTodos(state.value);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        // Add any fetched todos to the array
        state.value = [...state.value, ...action.payload];
      });
  },
});

// Simulating minor delay to fetch the todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = localStorage.getItem("todos");
  const data = response ? JSON.parse(response) : [];
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 2000);
  });
});

export const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const { addTodo, openModal, setEditTodo, updateTodo, deleteTodo } =
  todosSlice.actions;

// selectors for todo specific values
export const selectTodo = (state) => state.todos.value;
export const selectModalState = (state) => state.todos.isModalOpen;
export const selectEditTodo = (state) => state.todos.editTodo;
export const selectFetchStatus = (state) => state.todos.fetchStatus;

export default todosSlice.reducer;
