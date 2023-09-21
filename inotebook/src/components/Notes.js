import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  let navigate=useNavigate()
  const { notes, fetchnotes,Editnote } = context;
  const [note, setnote] = useState({utitle:"",udescription:""})
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchnotes();
    }
    else{
      navigate('/login')
    }
  }, []);
  const updateNote = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id,utitle:currentnote.title,udescription:currentnote.description})
  };
  const ref = useRef(null); 
  const refClose=useRef(null);
  const handleClick=(e)=>{
    refClose.current.click();
    Editnote(note.id,note.utitle,note.udescription)
    console.log("Updating the note ...",note)
  }
  const handlechange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value}) 
  }
  return (
    <div className="container my-3">
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="/">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="utitle"
                    placeholder="Enter the title of your note"
                    value={note.utitle}
                    onChange={handlechange}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="udescription"
                    placeholder="Enter the description"
                    value={note.udescription}
                    onChange={handlechange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
