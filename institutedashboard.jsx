import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import InstituteAddCourse from "./InstituteAddCourse";
import ViewApplications from "./InstituteViewApplications";
import PublishAdmissions from "./InstitutePublishAdmissions";
import InstituteProfilePage from "./InstituteProfile";
import InstituteDashboard from "./InstitudeDashboard";

const Dashboard = ({ handleLogout }) => {
    return (
        <Router>
            <div style={styles.container}>
                <h2 style={styles.header}>Lesotho University Management Dashboard</h2>

                {/* Navigation Bar */}
                <nav style={styles.nav}>
                    <Link to="/" style={styles.navLink}>
                        Dashboard
                    </Link>
                    <Link to="/add-course" style={styles.navLink}>
                        Add Course
                    </Link>
                    <Link to="/applications" style={styles.navLink}>
                        View Applications
                    </Link>
                    <Link to="/publish" style={styles.navLink}>
                        Publish Admissions
                    </Link>
                    <Link to="/profile" style={styles.navLink}>
                        University Profile
                    </Link>
                </nav>

                {/* Logout Button */}
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>

                {/* Route Definitions */}
                <div style={styles.routesContainer}>
                    <Routes>
                        <Route path="/" element={<InstituteDashboard />} />
                        <Route path="/add-course" element={<InstituteAddCourse />} />
                        <Route path="/applications" element={<ViewApplications />} />
                        <Route path="/publish" element={<PublishAdmissions />} />
                        <Route path="/profile" element={<InstituteProfilePage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

// Styling for the dashboard and navigation links
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f9',
        padding: '30px', // Increased padding for more space around components
        borderRadius: '8px',
        maxWidth: '900px',
        margin: '0 auto',
        boxShadow: '0 0 30px 10px rgba(0, 255, 255, 0.6)', // Glowing effect around the container
        animation: 'fadeIn 1.5s ease-in-out',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '30px', // Added more space below the header
        animation: 'slideIn 1.5s ease-out',
    },
    nav: {
        display: 'flex',
        justifyContent: 'center',
        gap: '25px', // Increased gap between links
        marginBottom: '30px', // Added space below the nav bar
        paddingTop: '20px',
        paddingBottom: '20px',
        animation: 'fadeIn 2s ease-out',
    },
    navLink: {
        textDecoration: 'none',
        color: '#007acc',
        fontSize: '18px', // Slightly larger font size
        transition: 'color 0.3s ease',
    },
    logoutButton: {
        display: 'block',
        width: '100%',
        padding: '15px 20px', // Increased padding for a larger button
        backgroundColor: '#0056b3', // Dark blue
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '18px', // Larger font size for the button
        transition: 'background-color 0.3s ease',
        marginTop: '30px', // Increased space above the button
    },
    routesContainer: {
        padding: '20px', // Added padding to the route container for more spacing
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', // Soft shadow for the route content
    }
};

// Adding animation keyframes
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
    @keyframes slideIn {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(0); }
    }
`, styleSheet.cssRules.length);

export default Dashboard;
