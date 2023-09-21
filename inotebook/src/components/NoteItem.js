import React,{useContext} from 'react'
import noteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
  const {note,updateNote}=props;
  const context = useContext(noteContext)
  const{Deletenote}=context;
  const removeItem=()=>{
    Deletenote(note._id);
  }

  return (
    <div className="col-md-3" style={{width:"18rem"}}>
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <button className='btn btn-primary mx-2' onClick={()=>{updateNote(note)}}>Edit</button>
              <button className="btn btn-secondary" onClick={removeItem}>Delete</button>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
    </div>

  )
}

export default NoteItem