import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ todos, setTodos, listId }) => {
  const initialState = {
    message: '',
    list_id: listId
  };

  const [todo, setTodo] = useState(initialState);

  const handleChange = (e) => {
    setTodo({
      ...todo,
      message: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.message.trim().length < 10) return;

    const newTodo = {
      ...todo,
      id: Date.now(),
      status: false,
      completedOn: null
    };

    setTodos([newTodo, ...todos]);

    axios.post(`http://localhost:8888/todos`, todo)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
        setTodos(todos);
      });

    setTodo(initialState);
  };

  // Inline styles
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
    width: '100%',
    maxWidth: '400px',
    fontSize: '16px'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#0056b3'
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type='text'
        name='todo'
        value={todo.message}
        placeholder='Enter your todo (min. 10 characters)'
        onChange={handleChange}
        style={inputStyle}
      />
      <button 
        type='submit' 
        style={{
          ...buttonStyle,
          opacity: todo.message.trim().length >= 10 ? 1 : 0.5,
          cursor: todo.message.trim().length >= 10 ? 'pointer' : 'not-allowed'
        }}
        disabled={todo.message.trim().length < 10}
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
