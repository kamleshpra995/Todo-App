import logo from './logo.svg';
import './App.css';

import AddTodo from './Components/AddTodo';
import TodoList from './Components/TodoList';

function App() {
  return (
    <div className="flex flex-col gap-y-2 mx-auto mt-10 px-20 max-w-[700px]" >
      <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
       <AddTodo />
       <TodoList />
    </div>
  );
}

export default App;
