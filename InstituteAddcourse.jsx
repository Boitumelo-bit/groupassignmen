import React, { useState, useEffect } from "react";
import axios from "axios";

const InstituteAddCourse = () => {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [newFaculty, setNewFaculty] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [entryRequirements, setEntryRequirements] = useState("");
  const [courseCapacity, setCourseCapacity] = useState(10);
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [courses, setCourses] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch institutions from backend
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/api/institutions")
      .then((response) => {
        setInstitutions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching institutions:", error);
        setFeedbackMessage("Unable to load institutions. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch faculties based on selected institution
  useEffect(() => {
    if (selectedInstitution) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/api/faculties/${selectedInstitution}`)
        .then((response) => {
          setFaculties(response.data);
        })
        .catch((error) => {
          console.error("Error fetching faculties:", error);
          setFeedbackMessage("Unable to load faculties. Please try again later.");
        })
        .finally(() => setLoading(false));
    }
  }, [selectedInstitution]);

  // Filter courses based on search query
  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.faculty.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  // Add a new course
  const addCourse = () => {
    if (!selectedInstitution || !selectedFaculty) {
      setFeedbackMessage("Please select an institution and a faculty first.");
      return;
    }

    if (!newCourseName.trim() || !entryRequirements.trim() || !applicationDeadline.trim()) {
      setFeedbackMessage("Please fill in all fields (Course Name, Entry Requirements, and Application Deadline).");
      return;
    }

    const deadlineDate = new Date(applicationDeadline);
    if (isNaN(deadlineDate.getTime()) || deadlineDate <= new Date()) {
      setFeedbackMessage("Please provide a valid application deadline in the future.");
      return;
    }

    if (courseCapacity <= 0 || isNaN(courseCapacity)) {
      setFeedbackMessage("Course capacity should be a positive number.");
      return;
    }

    const course = {
      institution: selectedInstitution,
      faculty: selectedFaculty,
      name: newCourseName,
      entryRequirements,
      isFull: false,
      capacity: courseCapacity,
      deadline: deadlineDate.toISOString().split("T")[0],
    };

    axios
      .post("http://localhost:3001/api/courses", course)
      .then((response) => {
        setCourses((prevCourses) => [...prevCourses, { ...course, id: response.data.id }]);
        setFeedbackMessage(`Course "${newCourseName}" added successfully under Faculty "${selectedFaculty}"!`);
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        setFeedbackMessage("There was an error adding the course.");
      });

    // Reset form fields
    setNewCourseName("");
    setEntryRequirements("");
    setCourseCapacity(10);
    setApplicationDeadline("");
  };

  // Add a new faculty
  const addFaculty = () => {
    if (!selectedInstitution) {
      setFeedbackMessage("Please select an institution first.");
      return;
    }

    if (!newFaculty.trim()) {
      setFeedbackMessage("Please enter a valid faculty name.");
      return;
    }

    const facultyData = { institution: selectedInstitution, name: newFaculty };

    axios
      .post("http://localhost:3001/api/faculties", facultyData)
      .then((response) => {
        setFaculties((prevFaculties) => [...prevFaculties, { name: newFaculty }]);
        setFeedbackMessage(`Faculty "${newFaculty}" added successfully.`);
      })
      .catch((error) => {
        console.error("Error adding faculty:", error);
        setFeedbackMessage("There was an error adding the faculty.");
      });

    setNewFaculty(""); // Reset input field for new faculty
  };

  return (
    <div className="course-container">
      <h2>Add a New Course</h2>

      {loading && <p>Loading...</p>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="feedback">
        {feedbackMessage && <p>{feedbackMessage}</p>}
      </div>

      <div className="form">
        {/* Institution Selection */}
        <div>
          <label>Institution:</label>
          <select value={selectedInstitution} onChange={(e) => setSelectedInstitution(e.target.value)}>
            <option value="">Select an Institution</option>
            {institutions.map((institution) => (
              <option key={institution.id} value={institution.name}>
                {institution.name}
              </option>
            ))}
          </select>
        </div>

        {/* Faculty Selection */}
        <div>
          <label>Faculty:</label>
          <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)}>
            <option value="">Select a Faculty</option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.name}>
                {faculty.name}
              </option>
            ))}
          </select>
          <button onClick={addFaculty}>Add Faculty</button>
        </div>

        {/* New Faculty Input */}
        <div>
          <label>New Faculty Name:</label>
          <input
            type="text"
            value={newFaculty}
            onChange={(e) => setNewFaculty(e.target.value)}
            placeholder="Enter new faculty name"
          />
        </div>

        {/* Course Name Input */}
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
            placeholder="Enter course name"
          />
        </div>

        {/* Entry Requirements */}
        <div>
          <label>Entry Requirements:</label>
          <textarea
            value={entryRequirements}
            onChange={(e) => setEntryRequirements(e.target.value)}
            placeholder="Enter entry requirements"
          />
        </div>

        {/* Course Capacity */}
        <div>
          <label>Course Capacity:</label>
          <input
            type="number"
            value={courseCapacity}
            onChange={(e) => setCourseCapacity(Math.min(e.target.value, 1000))}
            min="1"
            max="1000"
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label>Application Deadline:</label>
          <input
            type="date"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button onClick={addCourse}>Add Course</button>
        </div>
      </div>

      {/* Display filtered courses */}
      <div className="courses-list">
        <h3>Available Courses</h3>
        <ul>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <li key={course.id}>
                <h4>
                  {course.name} (Faculty: {course.faculty})
                </h4>
                <p>Institution: {course.institution}</p>
                <p>Capacity: {course.capacity}</p>
                <p>Application Deadline: {new Date(course.deadline).toLocaleDateString()}</p>
              </li>
            ))
          ) : (
            <p>No courses found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default InstituteAddCourse;
