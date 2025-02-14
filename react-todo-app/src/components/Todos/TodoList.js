import React from 'react'
import Todo from './Todo'

const TodoList = ({todos, deleteHandler, updateHandler}) => {
  // Ensure todos is always an array and sort by priority
  const sortedTodos = Array.isArray(todos) ? [...todos].sort((a, b) => {
    const priorityOrder = {
      'HIGH': 0,
      'MEDIUM': 1,
      'LOW': 2,
      'high': 0,
      'medium': 1,
      'low': 2
    };
    
    // Get priority values, default to lowest priority if undefined
    const priorityA = priorityOrder[a.priority?.toUpperCase()] ?? 2;
    const priorityB = priorityOrder[b.priority?.toUpperCase()] ?? 2;
    
    return priorityA - priorityB;
  }) : [];
  
  const listStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
    borderRadius: '10px',
    margin: '20px 0'
  };

  return (
    <div style={listStyle}>
      {sortedTodos.map(todo => (
        <div key={todo.id} className={`todo-card priority-${todo.priority?.toLowerCase() || 'low'}`} style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: `4px solid ${
            todo.priority?.toLowerCase() === 'high' ? '#ff4444' : 
            todo.priority?.toLowerCase() === 'medium' ? '#ffbb33' : 
            '#00C851'
          }`
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