import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const app=express();
import NotesModel from './database.js'

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://didarabbas:didarmongo123@cluster0.a4ndimk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.post("/note",(req,res)=>{
    NotesModel.create(req.body).then(newnote=>res.json(newnote)).catch(err=>res.json(err));
})

app.get("/displayNote",(req,res)=>{
    NotesModel.find().then(newnotes=>res.json(newnotes)).catch(err=>console.log(err))
})

app.get("/updateNotes/:id",(req,res)=>{
    const id=req.params.id
    NotesModel.findOne({_id:id}).then(newnote=>res.json(newnote)).catch(err=>console.log(err))

})

app.put("/updatenotes/:id",(req,res)=>{
    const id=req.params.id;
   NotesModel.findByIdAndUpdate({_id:id},{title:req.body.title,description:req.body.description}).then(newnote=>res.json(newnote)).catch(err=>console.log(err))
})

app.delete("/deleteNote/:id",(req,res)=>{
    const id=req.params.id;
    NotesModel.findByIdAndDelete({_id:id}).then(result=>res.json(result)).catch(err=>console.log(err))
})


app.listen(8000,()=>{
    console.log("Server is Running");
})