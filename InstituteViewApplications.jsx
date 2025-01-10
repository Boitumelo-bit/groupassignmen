import React, { useState, useEffect } from "react";

const ViewApplications = () => {
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedApplications, setSelectedApplications] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [applicationsPerPage, setApplicationsPerPage] = useState(5);

    // Fetch the applications data from localStorage on component mount
    useEffect(() => {
        const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
        setApplications(storedApplications);
    }, []);

    // Handle the search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Track status changes for history
    const trackHistory = (application, newStatus) => {
        const newHistory = [...history, { ...application, newStatus, date: new Date() }];
        setHistory(newHistory);
        localStorage.setItem("statusHistory", JSON.stringify(newHistory));
    };

    // Admit a student by updating their status
    const admitStudent = (application) => {
        if (application.status === "admitted") {
            alert(`${application.name} has already been admitted.`);
            return;
        }

        const updatedApplications = applications.map((app) =>
            app === application ? { ...app, status: "admitted" } : app
        );
        setApplications(updatedApplications);
        localStorage.setItem("applications", JSON.stringify(updatedApplications));
        trackHistory(application, "admitted");
        alert(`${application.name} has been admitted.`);
    };

    // Reject a student by updating their status
    const rejectStudent = (application) => {
        if (application.status === "rejected") {
            alert(`${application.name} has already been rejected.`);
            return;
        }

        const updatedApplications = applications.map((app) =>
            app === application ? { ...app, status: "rejected" } : app
        );
        setApplications(updatedApplications);
        localStorage.setItem("applications", JSON.stringify(updatedApplications));
        trackHistory(application, "rejected");
        alert(`${application.name} has been rejected.`);
    };

    // Update the status for selected applications
    const bulkUpdateStatus = (status) => {
        const updatedApplications = applications.map((app) =>
            selectedApplications.includes(app) ? { ...app, status: status } : app
        );
        setApplications(updatedApplications);
        localStorage.setItem("applications", JSON.stringify(updatedApplications));

        selectedApplications.forEach((app) => {
            trackHistory(app, status);
        });

        alert(`Selected applications have been updated to ${status}.`);
    };

    // Handle selection of applications for bulk actions
    const toggleSelection = (app) => {
        setSelectedApplications((prevSelected) =>
            prevSelected.includes(app) ? prevSelected.filter((item) => item !== app) : [...prevSelected, app]
        );
    };

    // Filter applications based on search term
    const filteredApplications = applications.filter(
        (app) =>
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort applications by name (could be extended to sort by other fields)
    const sortedApplications = filteredApplications.sort((a, b) => a.name.localeCompare(b.name));

    // Pagination logic
    const indexOfLastApp = currentPage * applicationsPerPage;
    const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
    const currentApplications = sortedApplications.slice(indexOfFirstApp, indexOfLastApp);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h3>Applications</h3>

            {/* Loading Indicator */}
            {loading && <div>Loading...</div>}

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by name or course"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: "10px" }}
            />

            {/* Bulk Action Buttons */}
            <button onClick={() => bulkUpdateStatus("admitted")} style={{ marginRight: "10px" }}>
                Admit Selected
            </button>
            <button onClick={() => bulkUpdateStatus("rejected")} style={{ marginRight: "10px" }}>
                Reject Selected
            </button>

            {/* Application List */}
            <ul>
                {currentApplications.length > 0 ? (
                    currentApplications.map((app, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="checkbox"
                                onChange={() => toggleSelection(app)}
                                checked={selectedApplications.includes(app)}
                                style={{ marginRight: "10px" }}
                            />
                            <div>
                                <strong>{app.name}</strong> applied for {app.course} - Status:{" "}
                                <span
                                    style={{
                                        color: app.status === "admitted"
                                            ? "green"
                                            : app.status === "rejected"
                                            ? "red"
                                            : "orange",
                                    }}
                                >
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

            {/* Pagination */}
            <div>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage * applicationsPerPage >= sortedApplications.length}
                >
                    Next
                </button>
            </div>

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

export default ViewApplications;
