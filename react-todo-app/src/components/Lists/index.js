import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lists = ({ onSelectList, selectedList }) => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:8888/lists');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const createList = async (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    try {
      await axios.post('http://localhost:8888/lists', { name: newListName });
      setNewListName('');
      fetchLists();
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  return (
    <div className="lists-container">
      <h2>Lists</h2>
      <form onSubmit={createList}>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New List Name"
        />
        <button type="submit">Create List</button>
      </form>
      <div className="lists">
        {lists.map(list => (
          <div
            key={list.id}
            className={`list-item ${selectedList?.id === list.id ? 'selected' : ''}`}
            onClick={() => onSelectList(list)}
          >
            {list.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;