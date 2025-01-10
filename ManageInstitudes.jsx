import React, { useState, useEffect } from 'react';

const Institution = () => {
  const [institutions, setInstitutions] = useState([]);
  const [newInstitution, setNewInstitution] = useState('');

  useEffect(() => {
    const savedInstitutions = JSON.parse(localStorage.getItem('institutions')) || [];
    setInstitutions(savedInstitutions);
  }, []);

  const addInstitution = () => {
    const updatedInstitutions = [...institutions, newInstitution];
    setInstitutions(updatedInstitutions);
    localStorage.setItem('institutions', JSON.stringify(updatedInstitutions));
    setNewInstitution('');
  };

  const deleteInstitution = (index) => {
    const updatedInstitutions = institutions.filter((_, i) => i !== index);
    setInstitutions(updatedInstitutions);
    localStorage.setItem('institutions', JSON.stringify(updatedInstitutions));
  };

  return (
    <div>
      <h3>Manage Institutions</h3>
      <input
        type="text"
        placeholder="Add Institution"
        value={newInstitution}
        onChange={(e) => setNewInstitution(e.target.value)}
      />
      <button onClick={addInstitution}>Add</button>
      <ul>
        {institutions.map((inst, index) => (
          <li key={index}>
            {inst} <button onClick={() => deleteInstitution(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Institution;
