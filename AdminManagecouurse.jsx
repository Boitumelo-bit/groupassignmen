import React, { useState, useEffect } from 'react';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editCourse, setEditCourse] = useState({ name: '', faculty: '', entryRequirements: '', isFull: false, capacity: 0 });

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(savedCourses);
  }, []);

  const addCourse = () => {
    if (newCourse.trim() === '') return;  // Prevent adding empty courses
    const newCourseObject = { name: newCourse, faculty: '', entryRequirements: '', isFull: false, capacity: 0 };
    const updatedCourses = [...courses, newCourseObject];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setNewCourse('');
  };

  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  const clearCourses = () => {
    setCourses([]);
    localStorage.removeItem('courses');
  };

  const startEditCourse = (index) => {
    setIsEditing(index);
    setEditCourse({ ...courses[index] });
  };

  const confirmEditCourse = (index) => {
    const updatedCourses = courses.map((course, i) => (i === index ? { ...course, name: editCourse.name } : course));
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setIsEditing(null);
    setEditCourse({ name: '', faculty: '', entryRequirements: '', isFull: false, capacity: 0 });
  };

  // Ensure that we only call toLowerCase on valid strings
  const filteredCourses = courses.filter(course =>
    course.name && typeof course.name === 'string' && course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortCourses = () => {
    const sortedCourses = [...courses].sort((a, b) => a.name.localeCompare(b.name));
    setCourses(sortedCourses);
    localStorage.setItem('courses', JSON.stringify(sortedCourses));
  };

  return (
    <div>
      <h3>Manage Courses</h3>
      <input
        type="text"
        placeholder="Add Course"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
      />
      <button onClick={addCourse}>Add</button>
      <button onClick={clearCourses} disabled={courses.length === 0}>Clear All</button>
      <button onClick={sortCourses} disabled={courses.length === 0}>Sort Courses</button>

      <input
        type="text"
        placeholder="Search Courses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredCourses.length > 0 ? (
        <ul>
          {filteredCourses.map((course, index) => (
            <li key={index}>
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editCourse.name}
                    onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
                  />
                  <button onClick={() => confirmEditCourse(index)}>Save</button>
                  <button onClick={() => setIsEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {course.name} {/* Display the name of the course */}
                  <button onClick={() => startEditCourse(index)}>Edit</button>
                  <button onClick={() => deleteCourse(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available. Please add a course.</p>
      )}
    </div>
  );
};

export default Course;
