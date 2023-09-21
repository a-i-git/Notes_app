import React,{useContext,useEffect} from 'react'
import noteContext from '../context/notes/NoteContext';

const About = () => {
  return (
    <div container="my-3">
      <div className="container">
        <h1>About Page</h1>
        <p>My name is and my no. is</p>
      </div>
    </div>
  )
}

export default About;