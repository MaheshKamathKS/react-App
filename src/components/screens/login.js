import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5001/api/loginuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": credentials.email, "password": credentials.password })

            });
            const json = await response.json();

            if (!json.success) {
                throw new Error("Invalid email or password");
            }
            if (json.success) {
                // Set the authentication token in localStorage
                localStorage.setItem("userEmail", credentials.email);
                localStorage.setItem("authToken", json.authToken);
                // Log the authentication token to the console
                console.log(localStorage.getItem("authToken"));
                // Navigate the user to the home page
                navigate("/");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (<div style={{ backgroundImage: 'url(https://hungerbay.com/assets/images/b6.jpg)' }}>
        <div className='container full-screen xx' >
            
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="mb-4" style={{ color: "white" }}>Login</h2>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" style={{ color: "white" }}>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" style={{ color: "white" }}>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="mt-3">
                    <Link to="/creatuser">Create an account</Link>
                </div>
            </form>
            
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div></div>
    );
};

export default Login;
