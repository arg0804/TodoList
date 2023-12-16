import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div>
      <TodoForm initialValues={{ title: '', description: '', deadline: '' }} />
      <TodoList />
    </div>
  );
};

export default App;
