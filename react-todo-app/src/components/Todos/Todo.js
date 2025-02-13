import React, { useState } from 'react';

const Todo = ({ todo, deleteHandler, updateHandler }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ ...todo });

  const updateToDoState = (e) => {
    setUpdatedTodo({
      ...todo,
      title: e.target.value     // Only use title, remove message
    });
  };

  const toggleComplete = () => {
    const updatedStatus = {
      ...todo,
      title: todo.title,      // Use title instead of message
      status: !todo.status,
      completedOn: !todo.status ? new Date().toISOString() : null
    };
    updateHandler(updatedStatus);
  };

  const updateAndReset = (input, e) => {
    e.preventDefault();
    const updatedData = {
      ...todo,
      ...input,
      title: input.title || todo.title  // Use title instead of message
    };
    updateHandler(updatedData);
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '800px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: todo.status ? '#d4edda' : '#f9f9f9',
    transition: 'background-color 0.3s',
    boxSizing: 'border-box'
  };

  const formStyle = {
    flex: 1,
    marginRight: '10px',
    width: '100%',
    display: 'flex'
  };

  const inputStyle = {
    flexGrow: 1,
    fontSize: '16px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  };

  const textStyle = {
    margin: 0,
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'color 0.3s',
    wordBreak: 'break-word'
  };

  const checkboxStyle = {
    marginRight: '10px',
    cursor: 'pointer',
    width: '20px',
    height: '20px'
  };

  // Remove duplicate formStyle and inputStyle definitions and continue with other styles...
  const priorityBadgeStyle = {
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    marginLeft: '10px',
    backgroundColor: todo.priority === 'High' ? '#dc3545' :
                    todo.priority === 'Medium' ? '#ffc107' : '#28a745',
    color: todo.priority === 'Medium' ? '#000' : '#fff'
  };

  const detailsStyle = {
    fontSize: '14px',
    color: '#666',
    marginTop: '5px',
    wordBreak: 'break-word'
  };

  const buttonStyle = {
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  return (
    <div style={containerStyle}>
      <input
        type="checkbox"
        checked={Boolean(todo.status === 1 || todo.status === true)}
        onChange={toggleComplete}
        style={{
          ...checkboxStyle,
          marginTop: '4px' // Align with title
        }}
      />
      {isEditing ? (
        <form style={formStyle} onSubmit={(e) => updateAndReset(updatedTodo, e)}>
          <input
            type='text'
            style={inputStyle}
            defaultValue={todo.title}  // Only use title
            onChange={updateToDoState}
          />
        </form>
      ) : (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1,
          minWidth: 0 // Prevent flex items from overflowing
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            flexWrap: 'wrap', // Allow wrapping for long content
            gap: '8px' // Consistent spacing
          }}>
            <p style={{ 
              ...textStyle, 
              textDecoration: todo.status ? 'line-through' : 'none'
            }} 
            onDoubleClick={() => setIsEditing(true)}>
              {todo.title}
            </p>
            <span style={priorityBadgeStyle}>{todo.priority}</span>
          </div>
          
          {todo.details && (
            <p style={{
              ...detailsStyle,
              margin: '8px 0' // Consistent spacing
            }}>{todo.details}</p>
          )}
          
          <div style={{ 
            display: 'flex', 
            fontSize: '12px', 
            color: '#666',
            marginTop: '8px',
            gap: '15px' // Consistent spacing between date elements
          }}>
            {todo.dueDate && (
              <span>Due: {formatDate(todo.dueDate)}</span>
            )}
            {(todo.status === true || todo.status === 1) && todo.completedOn && 
              <span>Completed: {formatDate(todo.completedOn)}</span>
            }
          </div>
        </div>
      )}
      <button style={{
        ...buttonStyle,
        marginLeft: '10px',
        alignSelf: 'flex-start'
      }} onClick={() => deleteHandler(todo.id)}>X</button>
    </div>
  );
};

export default Todo;
