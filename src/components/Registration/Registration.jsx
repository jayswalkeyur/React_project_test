import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Login from '../Login/Login';

function Registration() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); // New state for role

    const [flag, setFlag] = useState(false);
    const [login, setLogin] = useState(true);

    // on form submit...
    async function handleFormSubmit(e) {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password || !role) {
            setFlag(true);
            return;
        } else {
            setFlag(false);
            const registrationData = {
                firstName,
                lastName,
                email,
                password,
                role, // Include role in registration data
            };

            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(registrationData),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Registration successful:', result);
                    // Optionally save data to localStorage or perform additional actions
                    setLogin(!login);
                } else {
                    console.error('Registration failed:', response.statusText);
                    // Handle error response (e.g., show a message to the user)
                }
            } catch (error) {
                console.error('Error occurred while registering:', error);
                // Handle network error (e.g., show a message to the user)
            }
        }
    }

    // Directly to the login page
    function handleClick() {
        setLogin(!login);
    }

    return (
        <>
            <nav className="navbar navbar-light"></nav>
            <div>
                {login ? (
                    <form onSubmit={handleFormSubmit}>
                        <h3>Register</h3>

                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter First Name"
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Last Name"
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Role</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Role"
                                onChange={(event) => setRole(event.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block">
                            Submit
                        </button>
                        <p className="forgot-password text-right">
                            Already registered? <a href="#" onClick={handleClick}>Log in</a>
                        </p>
                        {flag && (
                            <Alert color='primary' variant="danger">
                                Fill in all fields; it is important!
                            </Alert>
                        )}
                    </form>
                ) : (
                    <Login />
                )}
            </div>
        </>
    );
}

export default Registration;
