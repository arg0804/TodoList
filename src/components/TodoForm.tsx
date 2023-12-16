import React, { useState, useEffect } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RootState } from '../app/store';
import { Todo, addTodo, editTodo } from '../features/todoList/todoList.slice';
import styles from './TodoForm.module.css'

interface TodoFormProps {
  initialValues: {
    id?: number;
    title: string;
    description: string;
    deadline?: string;
  };
}

const TodoForm: React.FC<TodoFormProps> = ({ initialValues }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todoList.todos);

  const [formData, setFormData] = useState<Todo>({
    id: initialValues.id || 0,
    title: initialValues.title,
    description: initialValues.description,
    deadline: initialValues.deadline,
    status: 'Pending', 
  });

  useEffect(() => {
    if (initialValues.id) {
      const todoToEdit = todos.find((todo) => todo.id === initialValues.id);
      if (todoToEdit) {
        setFormData((prevData) => ({
          ...prevData,
          ...todoToEdit,
          description: todoToEdit.description || '',
          deadline: todoToEdit.deadline || '',
        }));
      }
    }
  }, [initialValues, todos]);

  const handleSubmit = (values: Todo) => {
    if (initialValues.id) {
      dispatch(editTodo(values));
    } else {
      dispatch(addTodo({ ...values, status: 'Pending', id: Date.now() }) as PayloadAction<Todo>);
    }
  };
  

  return (
    <Formik
      initialValues={formData}
      validationSchema={Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        deadline: Yup.string(),
      })}
      onSubmit={handleSubmit}
    >
       <Form className={styles.form}>
        <div>
          <label className={styles.label} htmlFor="title">
            Title:
          </label>
          <Field className={styles.inputField} type="text" name="title" />
          <ErrorMessage className={styles.errorMessage} name="title" component="div" />
        </div>

        <div>
          <label className={styles.label} htmlFor="description">
            Description:
          </label>
          <Field
            className={styles.textareaField}
            as="textarea"
            name="description"
          />
          <ErrorMessage
            className={styles.errorMessage}
            name="description"
            component="div"
          />
        </div>

        <div>
          <label className={styles.label} htmlFor="deadline">
            Deadline:
          </label>
          <Field className={styles.inputField} type="date" name="deadline" />
          <ErrorMessage
            className={styles.errorMessage}
            name="deadline"
            component="div"
          />
        </div>

        <div className={styles.buttonContainer}>
          <button className={`${styles.addButton} ${styles.add}`} type="submit">
            {initialValues.id ? 'Edit' : 'Add'} Todo
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default TodoForm;
