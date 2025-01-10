import React, { useState, useEffect } from 'react';

const Admissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [newAdmission, setNewAdmission] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editAdmission, setEditAdmission] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');

  useEffect(() => {
    const savedAdmissions = JSON.parse(localStorage.getItem('admissions')) || [];
    setAdmissions(savedAdmissions);
  }, []);

  const publishAdmission = () => {
    if (newAdmission.trim() === '') {
      alert('Admission name cannot be empty');
      return;
    }
    const admissionData = {
      name: newAdmission.trim(),
      date: admissionDate || new Date().toLocaleString(),
    };
    const updatedAdmissions = [...admissions, admissionData];
    setAdmissions(updatedAdmissions);
    localStorage.setItem('admissions', JSON.stringify(updatedAdmissions));
    setNewAdmission('');
    setAdmissionDate('');
    alert('Admission published successfully!');
  };

  const deleteAdmission = (index) => {
    if (window.confirm('Are you sure you want to delete this admission?')) {
      const updatedAdmissions = admissions.filter((_, i) => i !== index);
      setAdmissions(updatedAdmissions);
      localStorage.setItem('admissions', JSON.stringify(updatedAdmissions));
      alert('Admission deleted successfully!');
    }
  };

  const startEditAdmission = (index) => {
    setIsEditing(index);
    setEditAdmission(admissions[index].name);
  };

  const confirmEditAdmission = (index) => {
    if (editAdmission.trim() === '') {
      alert('Admission name cannot be empty');
      return;
    }
    const updatedAdmissions = admissions.map((admission, i) =>
      i === index ? { ...admission, name: editAdmission.trim() } : admission
    );
    setAdmissions(updatedAdmissions);
    localStorage.setItem('admissions', JSON.stringify(updatedAdmissions));
    setIsEditing(null);
    setEditAdmission('');
    alert('Admission updated successfully!');
  };

  const clearAdmissions = () => {
    if (window.confirm('Are you sure you want to clear all admissions?')) {
      setAdmissions([]);
      localStorage.removeItem('admissions');
      alert('All admissions cleared!');
    }
  };

  const sortAdmissions = () => {
    const sortedAdmissions = [...admissions].sort((a, b) => a.name.localeCompare(b.name));
    setAdmissions(sortedAdmissions);
    localStorage.setItem('admissions', JSON.stringify(sortedAdmissions));
  };

  const filteredAdmissions = admissions.filter(admission =>
    admission.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Publish Admissions</h3>
      <input
        type="text"
        placeholder="Admission Name"
        value={newAdmission}
        onChange={(e) => setNewAdmission(e.target.value)}
      />
      <input
        type="datetime-local"
        value={admissionDate}
        onChange={(e) => setAdmissionDate(e.target.value)}
      />
      <button onClick={publishAdmission}>Publish New Admission</button>
      <button onClick={clearAdmissions} disabled={admissions.length === 0}>
        Clear All Admissions
      </button>
      <button onClick={sortAdmissions} disabled={admissions.length === 0}>
        Sort Admissions
      </button>

      <input
        type="text"
        placeholder="Search Admissions"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredAdmissions.length > 0 ? (
        <ul>
          {filteredAdmissions.map((admission, index) => (
            <li key={index}>
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editAdmission}
                    onChange={(e) => setEditAdmission(e.target.value)}
                  />
                  <button onClick={() => confirmEditAdmission(index)}>Save</button>
                  <button onClick={() => setIsEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {admission.name} (Published on: {admission.date})
                  <button onClick={() => startEditAdmission(index)}>Edit</button>
                  <button onClick={() => deleteAdmission(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No admissions available. Please publish an admission.</p>
      )}
    </div>
  );
};

export default Admissions;
