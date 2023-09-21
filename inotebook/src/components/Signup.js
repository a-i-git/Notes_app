import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const [credentials, setcredentials] = useState({Name:"",email:"",password:"",cpassword:""})
  let navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({//Required for a POST request
        Name:credentials.Name,
        email: credentials.email,
        password: credentials.password,
      }),
    }); 
    const json = await response.json();
    console.log(json);
    localStorage.setItem('token',json.authToken)
    navigate("/")
};
  const handlechange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className='container my-3'>
      <h1>SignUp to Start</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input type="text" className="form-control" id="Name" name="Name" value={credentials.Name} 
          onChange={handlechange} aria-describedby="Name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email'value={credentials.email} 
          onChange={handlechange} aria-describedby="email"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={credentials.password} 
          onChange={handlechange} name='password' minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} 
          onChange={handlechange} name='cpassword' minLength={5} required/>
        </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default Signup