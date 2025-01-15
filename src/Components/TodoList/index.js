import React, { useState } from 'react';

import { useTodos } from '../../Context/TodoContext';
import TodoItem from '../TodoItem';

const TodoList = () => {
    const {todos} = useTodos();

    return (
        <div className='flex flex-col mt-5'>
            {
                todos.map((todo, index) => (
                    <TodoItem todo={todo} index={index} key={index}/>
                ))
            }
        </div>
    )
}

export default TodoList;