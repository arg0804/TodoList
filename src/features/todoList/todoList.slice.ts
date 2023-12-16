// todoList.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  title: string;
  description: string;
  deadline?: string;
  status: 'Pending' | 'Completed' | 'Overdue' | 'Removed';
}

interface TodoListState {
  todos: Todo[];
  trash: Todo[];
}

const initialState: TodoListState = {
  todos: [],
  trash: [],
};

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const todoToRemove = state.todos.find((todo) => todo.id === action.payload);
      if (todoToRemove) {
        todoToRemove.status = 'Removed';
        state.trash.push(todoToRemove);
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      }
    },
    markAsComplete: (state, action: PayloadAction<number>) => {
      const todoToComplete = state.todos.find((todo) => todo.id === action.payload);
      if (todoToComplete) {
        todoToComplete.status = todoToComplete.status === 'Pending' ? 'Completed' : 'Pending';
      }
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    getTrash: (state) => {
      state.trash = [...state.trash];
    },
  },
});

export const { addTodo, removeTodo, markAsComplete, editTodo, getTrash } = todoListSlice.actions;

export default todoListSlice.reducer;
