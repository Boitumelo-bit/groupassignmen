import React, { useState, useEffect } from 'react';

const Faculty = () => {
  const [institutions, setInstitutions] = useState([]); // List of institutions
  const [selectedInstitution, setSelectedInstitution] = useState(''); // Selected institution
  const [selectedCourse, setSelectedCourse] = useState(''); // Selected course within institution
  const [faculties, setFaculties] = useState([]); // Faculties list for the selected course
  const [courses, setCourses] = useState([]); // Courses for the selected institution
  const [newFaculty, setNewFaculty] = useState(''); // New faculty input
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering faculties
  const [isEditing, setIsEditing] = useState(null); // Editing state
  const [editFaculty, setEditFaculty] = useState(''); // Edited faculty name

  useEffect(() => {
    const savedInstitutions = JSON.parse(localStorage.getItem('institutions')) || [];
    setInstitutions(savedInstitutions);
  }, []);

  useEffect(() => {
    if (selectedInstitution) {
      const savedCourses = JSON.parse(localStorage.getItem(selectedInstitution))?.courses || [];
      setCourses(savedCourses);
    }
  }, [selectedInstitution]);

  useEffect(() => {
    if (selectedInstitution && selectedCourse) {
      const savedFaculties = JSON.parse(localStorage.getItem(selectedInstitution))?.courses?.[selectedCourse] || [];
      setFaculties(savedFaculties);
    }
  }, [selectedInstitution, selectedCourse]);

  const addFaculty = () => {
    if (!selectedInstitution || !selectedCourse) {
      alert('Please select an institution and course first');
      return;
    }
    if (newFaculty.trim() === '') {
      alert('Faculty name cannot be empty');
      return;
    }
    if (faculties.includes(newFaculty.trim())) {
      alert('This faculty already exists');
      return;
    }

    const updatedFaculties = [...faculties, newFaculty.trim()];
    setFaculties(updatedFaculties);

    // Save faculty under the selected institution and course
    const updatedInstitutionData = JSON.parse(localStorage.getItem(selectedInstitution));
    updatedInstitutionData.courses[selectedCourse] = updatedFaculties;
    localStorage.setItem(selectedInstitution, JSON.stringify(updatedInstitutionData));

    setNewFaculty('');
  };

  const deleteFaculty = (index) => {
    const updatedFaculties = faculties.filter((_, i) => i !== index);
    setFaculties(updatedFaculties);

    // Update faculty list in localStorage for selected course
    const updatedInstitutionData = JSON.parse(localStorage.getItem(selectedInstitution));
    updatedInstitutionData.courses[selectedCourse] = updatedFaculties;
    localStorage.setItem(selectedInstitution, JSON.stringify(updatedInstitutionData));
  };

  const startEditFaculty = (index) => {
    setIsEditing(index);
    setEditFaculty(faculties[index]);
  };

  const confirmEditFaculty = (index) => {
    if (editFaculty.trim() === '') {
      alert('Faculty name cannot be empty');
      return;
    }

    const updatedFaculties = faculties.map((faculty, i) =>
      i === index ? editFaculty.trim() : faculty
    );
    setFaculties(updatedFaculties);

    // Update faculty list in localStorage for selected course
    const updatedInstitutionData = JSON.parse(localStorage.getItem(selectedInstitution));
    updatedInstitutionData.courses[selectedCourse] = updatedFaculties;
    localStorage.setItem(selectedInstitution, JSON.stringify(updatedInstitutionData));

    setIsEditing(null);
    setEditFaculty('');
  };

  const clearFaculties = () => {
    setFaculties([]);
    // Clear faculty list in localStorage for selected course
    const updatedInstitutionData = JSON.parse(localStorage.getItem(selectedInstitution));
    updatedInstitutionData.courses[selectedCourse] = [];
    localStorage.setItem(selectedInstitution, JSON.stringify(updatedInstitutionData));
  };

  const sortFaculties = () => {
    const sortedFaculties = [...faculties].sort();
    setFaculties(sortedFaculties);

    // Save sorted faculties to localStorage
    const updatedInstitutionData = JSON.parse(localStorage.getItem(selectedInstitution));
    updatedInstitutionData.courses[selectedCourse] = sortedFaculties;
    localStorage.setItem(selectedInstitution, JSON.stringify(updatedInstitutionData));
  };

  const filteredFaculties = faculties.filter(faculty =>
    typeof faculty === 'string' && faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Manage Faculties</h3>

      {/* Institution selection dropdown */}
      <select onChange={(e) => setSelectedInstitution(e.target.value)} value={selectedInstitution}>
        <option value="">Select Institution</option>
        {institutions.map((institution, index) => (
          <option key={index} value={institution.name}>
            {institution.name}
          </option>
        ))}
      </select>

      {/* Course selection dropdown */}
      <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse} disabled={!selectedInstitution}>
        <option value="">Select Course</option>
        {courses.map((course, index) => (
          <option key={index} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>

      {/* Add faculty form */}
      <input
        type="text"
        placeholder="Add Faculty"
        value={newFaculty}
        onChange={(e) => setNewFaculty(e.target.value)}
        disabled={!selectedInstitution || !selectedCourse}
      />
      <button onClick={addFaculty} disabled={!selectedInstitution || !selectedCourse}>Add</button>
      <button onClick={clearFaculties} disabled={faculties.length === 0}>Clear All</button>
      <button onClick={sortFaculties} disabled={faculties.length === 0}>Sort Faculties</button>

      <input
        type="text"
        placeholder="Search Faculties"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredFaculties.length > 0 ? (
        <ul>
          {filteredFaculties.map((faculty, index) => (
            <li key={index}>
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editFaculty}
                    onChange={(e) => setEditFaculty(e.target.value)}
                  />
                  <button onClick={() => confirmEditFaculty(index)}>Save</button>
                  <button onClick={() => setIsEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {faculty}
                  <button onClick={() => startEditFaculty(index)}>Edit</button>
                  <button onClick={() => deleteFaculty(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No faculties available. Please add a faculty.</p>
      )}
    </div>
  );
};

export default Faculty;
