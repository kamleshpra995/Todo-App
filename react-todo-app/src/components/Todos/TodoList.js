import React from 'react'
import Todo from './Todo'

const TodoList = ({todos, deleteHandler, updateHandler}) => {
  // Ensure todos is always an array
  const todoList = Array.isArray(todos) ? todos : [];
  
  return (
    <div>
      {todoList.map(todo => (
        <Todo 
          key={todo.id} 
          todo={todo} 
          deleteHandler={deleteHandler} 
          updateHandler={updateHandler} 
        />
      ))}
    </div>
  );
}

export default TodoList