import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; 

const SignUp = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/api/creatuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": credentials.name,
        "email": credentials.email,
        "password": credentials.password,
        "location": credentials.geolocation
      })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Details");
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
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div style={{ backgroundImage: "url(https://hungerbay.com/assets/images/b6.jpg)", width: "100%", minHeight: "100vh", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className='container ss'>
        <fieldset style={{ border: "1px solid white", borderRadius: "10px", padding: "20px" }}>
          <legend style={{ color: "white" }}>Sign Up</legend>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={onChange} />
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/Login" className='m-3 btn btn-danger'>Already a user</Link>
          </form>
        </fieldset>
      </div>
    </div>
  );
}

export default SignUp;
