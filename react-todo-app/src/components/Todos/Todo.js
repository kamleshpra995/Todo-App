import React, { useState } from 'react';

const Todo = ({ todo, deleteHandler, updateHandler }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ ...todo });

  const updateToDoState = (e) => {
    setUpdatedTodo({
      ...todo,
      message: e.target.value
    });
  };

  const toggleComplete = () => {
    const updatedStatus = {
      ...todo,
      status: !todo.status,
      completedOn: !todo.status ? new Date().toISOString() : null
    };
    updateHandler(updatedStatus);
  };

  const updateAndReset = (input, e) => {
    e.preventDefault();
    updateHandler({
      ...todo,
      ...input
    });
    setIsEditing(false);
  };

  // Clean up the date display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return '';
    }
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: todo.status ? '#d4edda' : '#f9f9f9',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#f1f1f1'
    }
  };

  const textStyle = {
    flexGrow: 1,
    margin: 0,
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'color 0.3s',
    ':hover': {
      color: '#007bff'
    }
  };

  const inputStyle = {
    flexGrow: 1,
    fontSize: '16px',
    padding: '5px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    ':focus': {
      borderColor: '#007bff'
    }
  };

  const buttonStyle = {
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#ff4757'
    }
  };

  // Add checkbox style
  const checkboxStyle = {
    marginRight: '10px',
    cursor: 'pointer'
  };

  const completedDateStyle = {
    fontSize: '12px',
    color: '#666',
    marginLeft: '10px'
  };

  return (
    <div style={containerStyle}>
      <input
        type="checkbox"
        checked={Boolean(todo.status === 1 || todo.status === true)}
        onChange={toggleComplete}
        style={checkboxStyle}
      />
      {isEditing ? (
        <form onSubmit={(e) => updateAndReset(updatedTodo, e)}>
          <input
            type='text'
            style={inputStyle}
            defaultValue={todo.message}
            onChange={updateToDoState}
          />
        </form>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <p style={{ ...textStyle, textDecoration: todo.status ? 'line-through' : 'none' }} 
             onDoubleClick={() => setIsEditing(true)}>
            {todo.message}
          </p>
          {(todo.status === true || todo.status === 1) && todo.completedOn && 
            <span style={completedDateStyle}>
              Completed: {formatDate(todo.completedOn)}
            </span>
          }
        </div>
      )}
      <button style={buttonStyle} onClick={() => deleteHandler(todo.id)}>X</button>
    </div>
  );
};

export default Todo;
