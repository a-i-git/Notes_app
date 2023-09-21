import React, { useEffect } from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom"

const Navbar = () => {
  let location=useLocation();
  let navigate=useNavigate()
    useEffect(() => {
      console.log(location.pathname);
    }, [location.pathname])
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/")
  }
  return (
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`}  aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Another action
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex" role="log/sign">
            <Link className="btn btn-primary mx-2" to="/login" >Login</Link>
            <Link className="btn btn-primary" to="/signup">Sign Up</Link>
          </form>:<Link className="btn btn-primary" to="/login" 
          onClick={handleLogout}>Logout</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
