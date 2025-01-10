import React, { useState } from "react";
import Dashboard from "./institutedashboard";
import StudentDashboard from "./studentDashboard";
import Admin from "./AdminDashboard";
import Login from "./login";
import Register from "./Register";
import "./App.css"; // Import CSS file

const App = () => {
    const [activeDashboard, setActiveDashboard] = useState("login"); // Default to login page
    const [role, setRole] = useState(null); // Track user role

    // Logout handler to reset role and redirect to login
    const handleLogout = () => {
        setRole(null); // Set role to null, logging out the user
        setActiveDashboard("login"); // Redirect to login screen
    };

    const renderDashboard = () => {
        switch (role) {
            case "institute":
                return <Dashboard handleLogout={handleLogout} />;
            case "student":
                return <StudentDashboard handleLogout={handleLogout} />;
            case "admin":
                return <Admin handleLogout={handleLogout} />;
            default:
                return null; // Return null if role is not set
        }
    };

    return (
        <div className="app-container">
            <header className="header">
                {/* Your header content */}
            </header>
            <main className="dashboard-container">
                {/* Render Login or Register based on activeDashboard state */}
                {activeDashboard === "login" && (
                    <>
                        <Login setActiveDashboard={setActiveDashboard} setRole={setRole} />
                        {/* Render the Register link only when the active dashboard is "login" */}
                        <span onClick={() => setActiveDashboard("register")} className="register-link">
                            Register
                        </span>
                    </>
                )}

                {activeDashboard === "register" && <Register setActiveDashboard={setActiveDashboard} />}

                {/* Render the appropriate dashboard based on user role */}
                {role && renderDashboard()}
            </main>
        </div>
    );
};

export default App;
