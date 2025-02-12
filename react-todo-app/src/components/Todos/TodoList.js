import React from 'react'
import Todo from './Todo'

const TodoList = ({todos, deleteHandler, updateHandler}) => {
  // Ensure todos is always an array
  const todoList = Array.isArray(todos) ? todos : [];
  
  const listStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    margin: '20px 0'
  };

  return (
    <div style={listStyle}>
      {todoList.map(todo => (
        <div key={todo.id} style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <Todo 
            todo={todo} 
            deleteHandler={deleteHandler} 
            updateHandler={updateHandler} 
          />
        </div>
      ))}
    </div>
  );
}

export default TodoList