import React, { useState } from "react";

const Apply = ({ courses, name, applications, setApplications }) => {
    const [appliedCourse, setAppliedCourse] = useState(null);

    const apply = (courseName, entryRequirements, courseDeadline) => {
        if (!name) {
            alert("Please enter your name before applying.");
            return;
        }

        if (appliedCourse) {
            alert(`You have already applied for ${appliedCourse}.`);
            return;
        }

        const meetsRequirements = window.prompt(`Do you meet the entry requirements: ${entryRequirements}? (yes/no)`);

        if (meetsRequirements.toLowerCase() !== "yes") {
            alert("You do not meet the entry requirements for this course.");
            return;
        }

        const course = courses.find(course => course.name === courseName);
        const applicantsForCourse = applications.filter(app => app.course === courseName);

        if (applicantsForCourse.length >= course.capacity) {
            alert(`Sorry, the course ${courseName} is full.`);
            return;
        }

        const appliedCoursesCount = applications.filter(app => app.name === name).length;
        if (appliedCoursesCount >= 3) {
            alert("You can only apply to a maximum of 3 courses.");
            return;
        }

        const currentDate = new Date();
        const deadlineDate = new Date(courseDeadline);
        if (currentDate > deadlineDate) {
            alert(`The deadline for applying to ${courseName} has passed.`);
            return;
        }

        const application = { name, course: courseName, status: "pending", dateApplied: new Date() };
        const updatedApplications = [...applications, application];
        setApplications(updatedApplications);
        localStorage.setItem("applications", JSON.stringify(updatedApplications));
        setAppliedCourse(courseName);
        alert(`Applied for ${courseName}`);
    };

    return (
        <div>
            <h3>Available Courses</h3>
            {courses.length > 0 ? (
                courses.map((course, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        <strong>{course.faculty}</strong>: {course.name} (Capacity: {course.capacity})<br />
                        <em>Entry Requirements:</em> {course.entryRequirements}<br />
                        <em>Application Deadline:</em> {course.deadline}<br />
                        <button
                            onClick={() => apply(course.name, course.entryRequirements, course.deadline)}
                            style={{ marginLeft: "10px", backgroundColor: "green", color: "white" }}
                            disabled={new Date() > new Date(course.deadline)} // Disable after deadline
                        >
                            Apply
                        </button>
                    </div>
                ))
            ) : (
                <p>No courses available.</p>
            )}
        </div>
    );
};

export default Apply;
