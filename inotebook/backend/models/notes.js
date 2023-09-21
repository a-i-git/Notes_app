const mongoose=require('mongoose');
const {Schema} = mongoose;


const notesSchema = new Schema({
    user:{//Foreign key (user id)   
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'//Name of the Schema
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
});
const Notes=mongoose.model('notes',notesSchema);
module.exports=Notes;