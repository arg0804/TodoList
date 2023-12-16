import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Todo, addTodo, removeTodo, markAsComplete, getTrash, } from '../features/todoList/todoList.slice';
import styles from './TodoList.module.css'

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todoList.todos);
  const trashTasks = useSelector((state: RootState) => state.todoList.trash);

  const handleRemove = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleComplete = (id: number) => {
    dispatch(markAsComplete(id));
  };

  React.useEffect(() => {
    dispatch(getTrash());
  }, [dispatch]);

  return (
    <div>
      <h2 className={styles.title}>Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={`${styles.task} ${todo.status === 'Pending' ? styles.pending : ''}`}>
            <div className={styles.taskDetails}>
              <div className={styles.title}>{todo.title}</div>
              {todo.description && <div className={styles.description}>{todo.description}</div>}
              {todo.deadline && <div className={styles.deadline}>Deadline: {todo.deadline}</div>}
            </div>
            <div>
              <button onClick={() => handleComplete(todo.id)}>
                {todo.status === 'Pending' ? 'Mark as Complete' : 'Pending'}
              </button>
              <button onClick={() => handleRemove(todo.id)} className={styles.removeButton}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
  
      <h2 className={styles.title}>Trash</h2>
      <ul>
        {trashTasks.map((task: Todo) => (
          <li key={task.id}>
            {task.title}- {task.description} - {task.deadline} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
