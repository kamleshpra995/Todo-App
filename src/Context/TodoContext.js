import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({children}) => {
    const [todos, setTodos] = useState([]);

    const addTodo = (value) => {
        setTodos([...todos, {value,  completed: false}]);
    }

    const updateTodo = (index, value) => {
        const updatedTodos = todos.map((todo, i) => {
            if(index===i){
                return {...todo, value}
            }
            return todo;
        });
        setTodos(updatedTodos);
    }
    const deleteTodo = (itemIndex) => {
        setTodos((prev) => prev.filter((_, index) => index !== itemIndex) )
    }

    const toggleTodo = (itemIndex) => {
        const updatedTodos = todos.map((todo, index) => {
            if(index===itemIndex){
                return {...todo, completed: !todo.completed, completedAt: new Date().toISOString()}
            }
            return todo;
        });
      setTodos(updatedTodos);
    }
    return <TodoContext.Provider value={{todos, addTodo, toggleTodo, updateTodo, deleteTodo}}>
        {children}
    </TodoContext.Provider>
};

export const useTodos = () => {
    return useContext(TodoContext);
}

export default TodoContext;