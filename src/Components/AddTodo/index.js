import React, { useState } from 'react';
import { useTodos } from '../../Context/TodoContext';

const AddTodo = () => {
    const [value, setValue] = useState('');
    const {addTodo} = useTodos();

    const submitHandler = (e) => {
        e.preventDefault();
        if(!value.trim()) return;
        addTodo(value);
        setValue('');
    }

    const onChange = (e) => setValue(e.target.value)

    return <form onSubmit={submitHandler} className="flex flex-grow gap-x-2 justify-between">
        <input type='text' value={value} placeholder='Add a new todo'
          className='form-input w-full rounded-md border shadow-sm p-2' onChange={onChange}
        />
        <button type='submit' className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Add</button>
    </form>
}

export default AddTodo;