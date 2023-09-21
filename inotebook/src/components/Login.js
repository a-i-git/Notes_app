import React, { useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate=useNavigate();//For redirection of the pages
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    }); 
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authToken)
        navigate("/")
    }
    else{
        alert("Please Enter the correct credentials")
    }

  };

  const handleChange = (e) => {
    setcredentials({ ...credentials,[e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Login to Continue</h1>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            aria-describedby="email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={handleChange}
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
