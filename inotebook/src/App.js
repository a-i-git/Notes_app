// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom" ;  
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login'
function App() {
  return (
    <NoteState>
      <Router>
        <Alert message={"Latest Hindi Course"}/>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
