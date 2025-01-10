import React, { useState } from "react";

const ViewAdmissions = ({ applications, setApplications, courses }) => {
    const [isEditing, setIsEditing] = useState(false);

    const cancelApplication = (courseName) => {
        if (window.confirm(`Are you sure you want to cancel your application for ${courseName}?`)) {
            const updatedApplications = applications.filter(app => app.course !== courseName);
            setApplications(updatedApplications);
            localStorage.setItem("applications", JSON.stringify(updatedApplications));
            alert(`Cancelled application for ${courseName}`);
        }
    };

    const handleEditApplication = (courseName) => {
        setIsEditing(true);
    };

    return (
        <div>
            <h3>Your Applications</h3>
            {applications.length > 0 ? (
                applications.map((app, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        <strong>{app.course}</strong> - Status: {app.status} <br />
                        {app.status === "pending" && (
                            <button
                                onClick={() => cancelApplication(app.course)}
                                style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                            >
                                Cancel Application
                            </button>
                        )}
                        {app.status === "pending" && !isEditing && (
                            <button
                                onClick={() => handleEditApplication(app.course)}
                                style={{ marginLeft: "10px", backgroundColor: "yellow", color: "black" }}
                            >
                                Edit Application
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p>You haven't applied for any courses yet.</p>
            )}
        </div>
    );
};

export default ViewAdmissions;
