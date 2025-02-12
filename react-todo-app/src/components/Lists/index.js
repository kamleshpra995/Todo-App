import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lists = ({ onSelectList, selectedList }) => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [listColors, setListColors] = useState({});

  // Function to generate random pastel colors
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 90%)`;
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Add new useEffect for default selection
  useEffect(() => {
    if (lists.length > 0 && !selectedList) {
      onSelectList(lists[0]);
    }
  }, [lists, selectedList, onSelectList]);

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:8888/lists');
      setLists(response.data);
      
      // Generate and store colors for new lists only
      const newColors = { ...listColors };
      response.data.forEach(list => {
        if (!newColors[list.id]) {
          newColors[list.id] = getRandomPastelColor();
        }
      });
      setListColors(newColors);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const createList = async (e) => {
    e.preventDefault();
    if (newListName.trim().length < 6) return;

    try {
      const response = await axios.post('http://localhost:8888/lists', { name: newListName });
      setNewListName('');
      // Add color for the new list
      setListColors(prev => ({
        ...prev,
        [response.data.id]: getRandomPastelColor()
      }));
      fetchLists();
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    margin: '20px 0'
  };

  const formStyle = {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px'
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    flex: '1'
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const listsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px'
  };

  return (
    <div style={containerStyle}>
      <h2>Lists</h2>
      <form onSubmit={createList} style={formStyle}>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New List Name (min. 6 characters)"
          style={inputStyle}
        />
        <button 
          type="submit" 
          style={{
            ...buttonStyle,
            opacity: newListName.trim().length >= 6 ? 1 : 0.5,
            cursor: newListName.trim().length >= 6 ? 'pointer' : 'not-allowed'
          }}
          disabled={newListName.trim().length < 6}
        >
          Create List
        </button>
      </form>
      <div style={listsGridStyle}>
        {lists.map(list => (
          <div
            key={list.id}
            onClick={() => onSelectList(list)}
            style={{
              backgroundColor: listColors[list.id] || '#ffffff',
              padding: '15px',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
              border: selectedList?.id === list.id ? '2px solid #007bff' : 'none',
              transform: selectedList?.id === list.id ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            {list.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;