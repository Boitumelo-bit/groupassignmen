import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./institutedashboard"; // Assuming your Dashboard component
import StudentDashboard from "./studentDashboard"; // Assuming your StudentDashboard component
import AddCoursePage from './AddCoursePage'; // Import the AddCoursePage component
import AddFacultyPage from './AddFacultyPage'; // Import the AddFacultyPage component
import AddInstitutionPage from './AddInstitutionPage'; // Import the AddInstitutionPage component

const App = () => {
  return (
    <Router>
      <div>
        {/* You can add a navigation bar for your routes */}
        <nav>
          <ul>
            <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
            <li><Link to="/student-dashboard">Student Dashboard</Link></li>
            <li><Link to="/admin/add-course">Add Course</Link></li>
            <li><Link to="/admin/add-faculty">Add Faculty</Link></li>
            <li><Link to="/admin/add-institution">Add Institution</Link></li> {/* Link to Add Institution */}
          </ul>
        </nav>

        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-course" element={<AddCoursePage />} /> {/* Add course page */}
          <Route path="/admin/add-faculty" element={<AddFacultyPage />} /> {/* Add faculty page */}
          <Route path="/admin/add-institution" element={<AddInstitutionPage />} /> {/* Add institution page */}

          {/* Student Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
