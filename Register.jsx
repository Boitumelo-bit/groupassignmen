import React, { useState } from "react";
import axios from "axios";
import styles from './Register.module.css';

const Register = ({ setActiveDashboard }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!username || !password || !confirmPassword || !role) {
            return "All fields are required.";
        }
        if (password !== confirmPassword) {
            return "Passwords do not match.";
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const handleRegister = async () => {
        setError("");
        setLoading(true);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/register", {
                username,
                password,
                role,
            });
            alert(response.data.message);
            setActiveDashboard("login");
        } catch (err) {
            setError(err.response ? err.response.data.message : "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.registerContainer}>
                <h2>Register</h2>
                
                {error && <p className={styles.errorMessage}>{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                />

                <div className={styles.roleSelection}>
                    <label>Select Your Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled={loading}
                    >
                        <option value="">--Select Role--</option>
                        <option value="student">Student</option>
                        <option value="institute">Institute</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                
                <button onClick={handleRegister} disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

                <div className={styles.loginLink}>
                    <p>
                        Already have an account?{" "}
                        <a href="#" onClick={() => setActiveDashboard("login")}>Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
