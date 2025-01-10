import React, { useState } from "react";
import styles from './Login.module.css';

const Login = ({ setActiveDashboard, setRole }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRoleState] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setRole(role);
            setActiveDashboard(role);
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <h2>Login</h2>

                <div className={styles.roleSelection}>
                    <label>Select Your Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRoleState(e.target.value)}
                        disabled={loading}
                    >
                        <option value="">--Select Role--</option>
                        <option value="student">Student</option>
                        <option value="institute">Institute</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

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

                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className={styles.forgotPassword}>
                    <a href="#">Forgot Password?</a>
                </div>

                <div className={styles.register}>
                    <p>Not registered yet? <a href="#">Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
