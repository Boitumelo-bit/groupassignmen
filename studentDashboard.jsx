import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ViewAdmissions from "./ViewAdmissions";
import Apply from "./Apply";
import StudentProfilePage from "./StudentProfile";  // Import Profile Page

const StudentDashboard = ({ handleLogout }) => {
    const [name, setName] = useState("");
    const [courses, setCourses] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch courses and applications from localStorage
    useEffect(() => {
        setLoading(true);
        try {
            const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
            const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
            setCourses(storedCourses);
            setApplications(storedApplications);
            // Get student name from localStorage if available
            const storedName = localStorage.getItem("studentName") || "";
            setName(storedName);
        } catch (e) {
            setError("An error occurred while loading data.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const clearSearch = () => setSearchTerm("");

    // Ensure that course.name and course.faculty are not undefined before calling toLowerCase
    const filteredCourses = courses.filter(
        (course) =>
            (course.name?.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (course.faculty?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort the filtered courses by name
    const sortedCourses = filteredCourses.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Router>
            <div style={styles.container}>
                <h2 style={styles.header}>Student Dashboard</h2>

                {/* Navigation Bar */}
                <nav style={styles.nav}>
                    <Link to="/" style={styles.navLink}>Apply for Courses</Link>
                    <Link to="/admissions" style={styles.navLink}>View Admissions</Link>
                    <Link to="/profile" style={styles.navLink}>Profile</Link>
                    
                </nav>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <div style={styles.content}>
                                <h3>Search Courses</h3>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Search by course name or faculty"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    style={styles.input}
                                />
                                <button onClick={clearSearch} style={styles.clearButton}>
                                    Clear Search
                                </button>

                                {loading && <p style={styles.loading}>Loading courses...</p>}
                                {error && <p style={styles.error}>{error}</p>}

                                <Apply
                                    courses={sortedCourses}
                                    name={name}
                                    applications={applications}
                                    setApplications={setApplications}
                                />

<div><button onClick={handleLogout} style={styles.logoutButton}>Logout</button></div>
                            </div>
                        }
                    />
                    <Route
                        path="/admissions"
                        element={
                            <ViewAdmissions
                                applications={applications}
                                setApplications={setApplications}
                                courses={courses}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <StudentProfilePage
                                name={name}
                                setName={setName}  // Pass setName to allow profile editing
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

// Styles for the dashboard
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f9',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 0 30px 10px gba(0,0,0,0.1)', // Glowing effect around the container
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    nav: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '20px',
        width: '100%',
        paddingBottom:'20px',
        paddingTop:'20px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#007acc',
        fontSize: '16px',
    },
    logoutButton: {
        display: 'block',
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#0056b3', // Dark greenish blue
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        textAlign: 'center',
    },
    content: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        textAlign: 'center',
    },
    clearButton: {
        backgroundColor: '#ff4444',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        
    },
    loading: {
        color: '#007acc',
        fontSize: '16px',
    },
    error: {
        color: '#ff4444',
        fontSize: '16px',
    },
};

export default StudentDashboard;
