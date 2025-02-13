import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ todos, setTodos, listId }) => {
  const initialState = {
    title: '',
    details: '',
    priority: 'Medium',
    dueDate: '',
    list_id: listId
  };

  const [todo, setTodo] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.title.trim().length < 3) return;

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
        setIsModalOpen(false);
      }).catch(err => {
        console.log(err);
        setTodos(todos);
      });

    setTodo(initialState);
  };

  // Modal styles
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    width: '90%',
    maxWidth: '500px'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999
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
    <div>
      <button 
        onClick={() => setIsModalOpen(true)}
        style={buttonStyle}
      >
        Add Todo
      </button>

      {isModalOpen && (
        <>
          <div style={overlayStyle} onClick={() => setIsModalOpen(false)} />
          <div style={modalStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
              <input
                type='text'
                name='title'
                value={todo.title}
                placeholder='Enter todo title'
                onChange={handleChange}
                style={inputStyle}
              />
              
              <select
                name='priority'
                value={todo.priority}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <input
                type='datetime-local'
                name='dueDate'
                value={todo.dueDate}
                onChange={handleChange}
                style={inputStyle}
              />

              <textarea
                name='details'
                value={todo.details}
                placeholder='Enter details'
                onChange={handleChange}
                style={{...inputStyle, height: '100px'}}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type='submit' 
                  style={{
                    ...buttonStyle,
                    opacity: todo.title.trim().length >= 3 ? 1 : 0.5,
                    cursor: todo.title.trim().length >= 3 ? 'pointer' : 'not-allowed'
                  }}
                  disabled={todo.title.trim().length < 3}
                >
                  Save Todo
                </button>
                <button 
                  type='button' 
                  onClick={() => setIsModalOpen(false)}
                  style={{...buttonStyle, backgroundColor: '#6c757d'}}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoForm;
