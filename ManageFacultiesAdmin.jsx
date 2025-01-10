import React, { useState, useEffect } from 'react';

const Faculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [newFaculty, setNewFaculty] = useState('');

  useEffect(() => {
    const savedFaculties = JSON.parse(localStorage.getItem('faculties')) || [];
    setFaculties(savedFaculties);
  }, []);

  const addFaculty = () => {
    const updatedFaculties = [...faculties, newFaculty];
    setFaculties(updatedFaculties);
    localStorage.setItem('faculties', JSON.stringify(updatedFaculties));
    setNewFaculty('');
  };

  const deleteFaculty = (index) => {
    const updatedFaculties = faculties.filter((_, i) => i !== index);
    setFaculties(updatedFaculties);
    localStorage.setItem('faculties', JSON.stringify(updatedFaculties));
  };

  return (
    <div>
      <h3>Manage Faculties</h3>
      <input
        type="text"
        placeholder="Add Faculty"
        value={newFaculty}
        onChange={(e) => setNewFaculty(e.target.value)}
      />
      <button onClick={addFaculty}>Add</button>
      <ul>
        {faculties.map((faculty, index) => (
          <li key={index}>
            {faculty} <button onClick={() => deleteFaculty(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faculty;
