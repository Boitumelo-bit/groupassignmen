import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageInstitutionsAdmin = () => {
  const [institutions, setInstitutions] = useState([]);
  const [newInstitution, setNewInstitution] = useState('');
  const [error, setError] = useState('');

  // Fetch institutions when the component mounts
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/institutions');
        setInstitutions(response.data);
      } catch (err) {
        setError('There was an error fetching the institutions!');
        console.error(err);
      }
    };
    fetchInstitutions();
  }, []);

  // Add new institution
  const addInstitution = async () => {
    if (!newInstitution) {
      setError('Institution name is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/institutions', { name: newInstitution });
      setInstitutions([...institutions, response.data]);
      setNewInstitution('');
      setError('');
    } catch (err) {
      setError('There was an error adding the institution!');
      console.error(err);
    }
  };

  // Delete institution
  const deleteInstitution = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/institutions/${id}`);
      setInstitutions(institutions.filter(inst => inst.id !== id));
      setError('');
    } catch (err) {
      setError('There was an error deleting the institution!');
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Manage Institutions</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Add Institution"
        value={newInstitution}
        onChange={(e) => setNewInstitution(e.target.value)}
      />
      <button onClick={addInstitution}>Add</button>
      <ul>
        {institutions.map((institution) => (
          <li key={institution.id}>
            {institution.name} 
            <button onClick={() => deleteInstitution(institution.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageInstitutionsAdmin;
