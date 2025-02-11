import './App.css';
import Todo from "./components/Todos";
import Lists from "./components/Lists";
import { useState } from 'react';

function App() {
  const [selectedList, setSelectedList] = useState(null);

  return (
    <div className="App">
      <div className="app-layout">
        <div className="lists-sidebar">
          <Lists onSelectList={setSelectedList} selectedList={selectedList} />
        </div>
        <div className="todo-container">
          {selectedList ? (
            <Todo listId={selectedList.id} />
          ) : (
            <p>Please select a list to view todos</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
