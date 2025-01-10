import React, { useState, useEffect } from "react";

const PublishAdmissions = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedApplications, setSelectedApplications] = useState([]);
    const [history, setHistory] = useState([]); // Track status changes for each application

    // Fetch applications from localStorage
    useEffect(() => {
        const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
        setApplications(storedApplications);
    }, []);

    // Publish all applications as pending
    const publishAdmissions = () => {
        setLoading(true);
        setTimeout(() => {
            if (applications.length === 0) {
                alert("No applications to publish.");
                setLoading(false);
                return;
            }

            const updatedApplications = applications.map((app) => ({
                ...app,
                status: "pending", // Set status to "pending" for all
            }));
            setApplications(updatedApplications);
            localStorage.setItem("applications", JSON.stringify(updatedApplications)); // Save to localStorage
            setLoading(false);
            alert("All applications have been published as pending!");
        }, 1000); // Simulate a delay
    };

    // Admit a specific student
    const admitStudent = (application) => {
        const updatedApplications = applications.map((app) =>
            app === application ? { ...app, status: "admitted" } : app
        );
        setApplications(updatedApplications);
        localStorage.setItem("applications", JSON.stringify(updatedApplications));

        // Track status change
        trackHistory(application, "admitted");
        alert(`${application.name} has been admitted!`);
    };

    // Reject a specific student
    const rejectStudent = (application) => {
        const updatedApplications = applications.map((app) =>
            app === application ? { ...app, status: "rejected" } : app
        );
        setApplications(updatedApplications);
        localStorage.setItem("applications", JSON.stringify(updatedApplications));

        // Track status change
        trackHistory(application, "rejected");
        alert(`${application.name} has been rejected.`);
    };

    // Track the status history (e.g., when status was updated and by whom)
    const trackHistory = (application, newStatus) => {
        const newHistory = [...history, { ...application, newStatus, date: new Date() }];
        setHistory(newHistory);
        localStorage.setItem("statusHistory", JSON.stringify(newHistory)); // Persist to localStorage
    };

    // Bulk action admit/reject selected applications
    const bulkAction = (action) => {
        const updatedApplications = applications.map((app) =>
            selectedApplications.includes(app) ? { ...app, status: action } : app
        );
        setApplications(updatedApplications);
        localStorage.setItem("applications", JSON.stringify(updatedApplications));

        // Track bulk status change for selected applications
        selectedApplications.forEach((app) => {
            trackHistory(app, action);
        });

        alert(`Selected applications have been ${action}ed.`);
    };

    // Handle selection of applications for bulk actions
    const toggleSelection = (app) => {
        setSelectedApplications((prevSelected) =>
            prevSelected.includes(app) ? prevSelected.filter((item) => item !== app) : [...prevSelected, app]
        );
    };

    return (
        <div>
            <h3>Publish Admissions</h3>

            {/* Loading Indicator */}
            {loading && <div>Processing...</div>}

            <button onClick={publishAdmissions} style={{ marginTop: "20px" }}>
                Publish All Applications as Pending
            </button>

            <button
                onClick={() => bulkAction("admitted")}
                style={{
                    marginTop: "20px",
                    backgroundColor: "green",
                    color: "white",
                }}
            >
                Admit Selected Applications
            </button>
            <button
                onClick={() => bulkAction("rejected")}
                style={{
                    marginTop: "20px",
                    backgroundColor: "red",
                    color: "white",
                }}
            >
                Reject Selected Applications
            </button>

            <h4>Applications</h4>
            <ul>
                {applications.length > 0 ? (
                    applications.map((app, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="checkbox"
                                onChange={() => toggleSelection(app)}
                                checked={selectedApplications.includes(app)}
                                style={{ marginRight: "10px" }}
                            />
                            <div>
                                <strong>{app.name}</strong> applied for {app.course} - Status:{" "}
                                <span style={{ color: app.status === "admitted" ? "green" : app.status === "rejected" ? "red" : "orange" }}>
                                    {app.status || "Not processed"}
                                </span>
                            </div>

                            {app.status !== "admitted" && app.status !== "rejected" && (
                                <>
                                    <button
                                        onClick={() => admitStudent(app)}
                                        style={{ marginLeft: "10px", backgroundColor: "blue", color: "white" }}
                                    >
                                        Admit
                                    </button>
                                    <button
                                        onClick={() => rejectStudent(app)}
                                        style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No applications yet.</p>
                )}
            </ul>

            {/* History Section */}
            <h4>Status Change History</h4>
            <ul>
                {history.length > 0 ? (
                    history.map((record, index) => (
                        <li key={index}>
                            <strong>{record.name}</strong> status changed to{" "}
                            <span style={{ color: record.newStatus === "admitted" ? "green" : "red" }}>
                                {record.newStatus}
                            </span>{" "}
                            on {new Date(record.date).toLocaleString()}
                        </li>
                    ))
                ) : (
                    <p>No status changes recorded yet.</p>
                )}
            </ul>
        </div>
    );
};

export default PublishAdmissions;
