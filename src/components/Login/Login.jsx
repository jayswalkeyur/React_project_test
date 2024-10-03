import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Dashboard from '../Dashboard/Dashboard'; // Adjust the import path if necessary

function Login() {
    const [namelog, setNamelog] = useState("");
    const [passwordlog, setPasswordlog] = useState("");
    const [flag, setFlag] = useState(false);
    const [dashboard, setDashboard] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        if (!namelog || !passwordlog) {
            setFlag(true);
            console.log("EMPTY");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: namelog, password: passwordlog }),
            });

            const data = await response.json();

            if (response.ok) {
                setDashboard(true);
                setFlag(false);
            } else {
                setFlag(true);
                console.log(data.message); // Log the error message if available
            }
        } catch (error) {
            console.error("Error during login:", error);
            setFlag(true);
        }
    }

    return (
        <div>
            {dashboard ? (
                <Dashboard />
            ) : (
                <form onSubmit={handleLogin}>
                    <h3>LogIn</h3>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            onChange={(event) => setNamelog(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(event) => setPasswordlog(event.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>

                    {flag && (
                        <Alert variant="warning">
                            Fill correct Info else keep trying.
                        </Alert>
                    )}
                </form>
            )}
        </div>
    );
}

export default Login;
