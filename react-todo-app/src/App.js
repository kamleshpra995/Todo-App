import './App.css';
import Todo from "./components/Todos";
import Lists from "./components/Lists";
import { useState, useEffect } from 'react';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [selectedList, setSelectedList] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      {isMobile && (
        <IconButton 
          onClick={() => setIsDrawerOpen(true)}
          style={{ position: 'fixed', top: 10, left: 10, zIndex: 1000 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      
      <div className="app-layout">
        {isMobile ? (
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            PaperProps={{
              sx: { 
                width: '80%', 
                maxWidth: '300px',
                '& .MuiDrawer-paper': {
                  overflow: 'hidden'
                }
              }
            }}
          >
            <div className="lists-sidebar-mobile">
              <Lists onSelectList={(list) => {
                setSelectedList(list);
                setIsDrawerOpen(false);
              }} 
              selectedList={selectedList} />
            </div>
          </Drawer>
        ) : (
          <div className="lists-sidebar">
            <Lists onSelectList={setSelectedList} selectedList={selectedList} />
          </div>
        )}
        
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
