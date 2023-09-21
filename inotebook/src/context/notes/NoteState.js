import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  //Get all notes

  const fetchnotes = async () => {
    const response = await fetch(`${host}/api/UNotes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  //Adding a note
  const Addnote = async (title, description) => {
    //API CALL
    const response = await fetch(`${host}/api/UNotes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description }), // body {title,description} type must match "Content-Type" header
    });
    const note=await response.json()
    setnotes(notes.concat(note));
  };

  //Editing a note
  const Editnote = async (id, title, description) => {
    let newnotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        break;
      }
    }
    setnotes(newnotes);
    //API CALL
    const response = await fetch(`${host}/api/UNotes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description }), // body {title,description} type must match "Content-Type" header
    });
  };

  //Deleting a note
  const Deletenote = async(id) => {
    console.log("Deleting note with id "+id)
    const response = await fetch(`${host}/api/UNotes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      }, 
    });
    const newnotes=notes.filter((note)=>{return note._id!==id})
    setnotes(newnotes)
  };
  return (
    <noteContext.Provider
      value={{ notes, fetchnotes, Addnote, Editnote, Deletenote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
