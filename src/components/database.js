import mongoose from "mongoose";
const Notes=new mongoose.Schema({
    title:String,
    description:String,
    name:String,
})

const NotesModel=new mongoose.model("notes",Notes);

export default NotesModel