import React, { useState } from 'react';
import { useTodos } from '../../Context/TodoContext';
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateTodo from '../UpdateTodo.js';

const TodoItem = ({todo, index}) => {
    const {toggleTodo, deleteTodo} = useTodos();
    const [editMode, setEditMode] = useState(false);
    const {value, completedAt, completed } = todo;
    console.log(editMode);
    const onComplete = () => toggleTodo(index);
    const onDelete = () => deleteTodo(index);

    return <div key={index} className="flex items-center mb-2"> 
           {!editMode && <input type="checkbox" checked={todo.completed} onChange={onComplete} className='form-checkbox h-5 w-5 text-blue-500' />}
          
            {!editMode &&<label className={`ml-2 text-lg flex-1 ${todo.completed ? 'text-gray-400 line-through': 'text-black'}`} >
                {value}
            </label>}
           {editMode && <UpdateTodo index={index} value={value}  setEditMode={setEditMode}/>}
           {!completed && !editMode && <button onClick={() => setEditMode(true) } className='text-blue-500 hover:text-blue-700 ml-2 h-5 w-5'>
            {<FaEdit />}
            </button>}
           {!completed && !editMode && <button onClick={onDelete} className='text-red-500 ml-4 hover:text-red-700 h-5 w-5'>
            {<FaTrash />}
            </button>
}
   {
    todo.completed ? <span className='ml-2 text-sm text-gray-500'> Completed At: {new Date(completedAt).toLocaleString()}</span> : null
   }

</div>
}

export default TodoItem;