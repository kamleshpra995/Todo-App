import React, { useState } from 'react';
import { useTodos } from '../../Context/TodoContext';

const UpdateTodo = ({value, index, setEditMode}) => {
    const [text, setValue] = useState(value);
    const {updateTodo} = useTodos();

    const submitHandler = (e) => {
        e.preventDefault();
        if(!value.trim()) return;
        updateTodo(index, text);
        setValue('');
        setEditMode(false);
    }
    
    const onChange = (e) => setValue(e.target.value)

    return <form onSubmit={submitHandler} className="flex flex-grow gap-x-2 justify-between">
        <input type='text' value={text} placeholder='Add a new todo'
          className='form-input w-full rounded-md border shadow-sm px-2' onChange={onChange}
        />
        <button type='submit' className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Update</button>
    </form>
}

export default UpdateTodo;