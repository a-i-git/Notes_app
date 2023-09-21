const express=require('express');
const router=express.Router();
const notes=require('../models/notes');
const fetchuser=require('../middleware/login');
const { body, validationResult } = require('express-validator');

// Fetching all the notes using GET request
router.get('/fetchnotes',fetchuser,async(req,res)=>{
    const Notes=await notes.find({user:req.user.id})
    res.json(Notes);
})

//Adding the notes to the database using GET request
router.post('/addnote',fetchuser,[
    body("title",'Enter a valid title').isLength({min:3}),
    body("description",'Description cannot be empty ').isLength({min:1}),
],async(req,res)=>{
    try {
        const {title,description}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {// If an error is found
            return res.status(400).json({errors:errors.array});
        }
        const note=new notes({
            title,description,user:req.user.id
        })
        const savedNotes=await note.save()
        res.json(savedNotes);
    } catch (error) {
        console.log("hii"+error.message)
        return res.status(500).send("Internal Server Error");
    }
})

//Updating an existing note
router.put('/updatenote/:id',fetchuser,async(req,res)=>{//put request is used for updation
    try {
        const {title,description}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {// If an error is found
            return res.status(400).json({errors:errors.array});
        }
        const Newnote={}//Newnote is the object,notes is the schema/model
        if(title){Newnote.title=title}
        if(description){Newnote.description=description}

        //Find the note to be updated and update it
        let note=await notes.findById(req.params.id)// the id used in the url /:id

        if(!note){res.status(404).send("Not Found")}//For finding the note

        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note=await notes.findByIdAndUpdate(req.params.id,{$set:Newnote},{new:true})
        res.json({note});

    } catch (error) {
        console.log("hii"+error.message)
        return res.status(500).send("Internal Server Error");
    }
})

//Deleting the user
router.delete('/delete/:id',fetchuser,async(req,res)=>{//put request is used for updation
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {// If an error is found
            return res.status(400).json({errors:errors.array});
        }

        //Find the note to be delete and deleted it
        let note=await notes.findById(req.params.id)// the id used in the url /:id

        if(!note){res.status(404).send("Not Found")}//For finding the note

        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note=await notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted",note:note});

    } catch (error) {
        console.log("hii"+error.message)
        return res.status(500).send("Internal Server Error");
    }
})


module.exports=router;
