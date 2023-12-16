import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from '../features/todoList/todoList.slice';

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;