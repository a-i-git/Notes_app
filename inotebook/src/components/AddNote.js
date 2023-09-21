import React,{useContext,useState}from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const{Addnote}=context;
    const [note, setnote] = useState({title:"",description:""})
    const handleClick=(e)=>{
      e.preventDefault()
      Addnote(note.title,note.description);  
      setnote({title:"",description:""})
    }
    const handlechange=(e)=>{
      setnote({...note,[e.target.name]:e.target.value}) 
    }
  return (
    <div className="container my-3">
      <h1>Add Notes</h1>
      <form action='/' onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' placeholder="Enter the title of your note" 
          onChange={handlechange} value={note.title} minLength={5}
          required/>
          </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type='text' className="form-control" id="description" name="description" placeholder='Enter the description' 
          onChange={handlechange} value={note.description} minLength={5}
          required/>
        </div>
        <div className="submitbtn">
          <button className='btn btn-primary'>Add Note</button>
        </div>
      </form>
    </div>
  )
}

export default AddNote