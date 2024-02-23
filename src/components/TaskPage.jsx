import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, Avatar, Grid, Card, CardContent, CardActions } from '@mui/material';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Footer from './Footer';
import logo from '../assets/logo.jpeg'

const TaskPage = () => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({ title: '', description: '', name: '' });
  const [notes, setNotes] = useState([]);
  {/* updates */ }
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateNote, setUpdateNote] = useState({ title: '', description: '' });
  const [id, setId] = useState("")

  useEffect(() => {
    axios.get('http://localhost:8000/displayNote').then(notes => setNotes(notes.data)).catch(err => console.log(err))

  }, [])


  const handleAdd = () => {
    setOpen(false)
    // alert(note.description+note.title)
    axios.post("http://localhost:8000/note", note).then(result => console.log(result)).catch(err => console.log(err));
  }


  const handleChange = (e) => {
    setNote({
      ...note, [e.target.name]: e.target.value
    })
  }

  const handleUpdate = (id) => {
    //console.log(id)
    setUpdateOpen(true)
    axios.get('http://localhost:8000/updateNotes/' + id).then(result => {
      console.log(result)
      setUpdateNote({ title: result.data.title, description: result.data.description, name: result.data.name })
      setId(result.data._id)
    }).catch(err => console.log(err))

  }
  const handleUpdateChange = (e) => {
    setUpdateNote({
      ...updateNote, [e.target.name]: e.target.value
    })
  }

  const update = (e, id) => {
    console.log(id)
    setUpdateOpen(false)
    axios.put("http://localhost:8000/updatenotes/" + id, updateNote).then(result => {
      console.log(result)
      window.location.reload()
    }).catch(err => console.log(err));
  }

  {/* Delete Functions */ }
  const handleDelete = (id) => {
    console.log(id)
    axios.delete("http://localhost:8000/deleteNote/" + id).then(result => {
      console.log(result)
      window.location.reload()
    }).catch(err => console.log(err));

  }

  return (
    <Stack sx={{ background: 'black', minHeight: '100vh', color: 'white' }}>
      <Box sx={{ width: { xs: '220px', sm: '280px', md: '280px', }, height: { xs: '120px', sm: '150px', md: '150px' }, marginLeft: '2em' }}>
        <Avatar variant='rounded' src={logo} alt="logo" style={{ height: '100%', width: '100%' }} />
      </Box>
      <IconButton variant='contained' sx={{ padding: '0.7em', backgroundColor: '#A28BF0', fontWeight: 'bold', position: 'fixed', bottom: '2em', right: '2em', color: 'white', boxShadow: '0px 0px 20px 0px #a28bf0', '&:hover': { backgroundColor: 'black' } }} onClick={() => setOpen(true)} ><AddIcon sx={{ width: '2em', height: '2em' }} /></IconButton>
      {/* Create Form */}
      <Dialog open={open} fullWidth minWidth='70%'>
        <Stack sx={{ padding: { xs: '0.4em', md: '2em' } }}>
          <DialogTitle sx={{ color: '#a28bf0', textAlign: 'center', fontFamily: 'Anta' }}>Enter your NOTES {<CreateIcon />}<IconButton sx={{ color: '#fa5760', float: 'right' }} size='small' onClick={() => setOpen(false)}><CloseOutlinedIcon /></IconButton></DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
            <TextField variant='standard' type='text' name='title' label='Enter Title' InputLabelProps={{ style: { fontFamily: 'Anta', fontWeight: 'bold' } }} inputProps={{style:{fontFamily:'Anta',color:'black'}}} onChange={handleChange} />
            <TextField variant='standard' type='text' multiline name='description' label='Enter Notes' InputLabelProps={{ style: { fontFamily: 'Anta', fontWeight: 'bold' } }} inputProps={{style:{fontFamily:'Anta',color:'black'}}} onChange={handleChange} />
            <TextField variant='standard' type='text' multiline name='name' label='Enter Name' InputLabelProps={{ style: { fontFamily: 'Anta', fontWeight: 'bold' } }} inputProps={{style:{fontFamily:'Anta',color:'black'}}} onChange={handleChange} />
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ fontFamily: 'Anta', backgroundColor: '#a28bf0', fontWeight: 'bold', textTransform: 'capitalize', width: '30%', '&:hover': { backgroundColor: 'black' } }} onClick={handleAdd} size='small'>Add</Button>
          </DialogActions>
        </Stack>
      </Dialog>
      {/* Displaying Fetched data*/}
      <Stack sx={{ width: '100%', height: 'fit-content', display: 'flex', alignItems: 'center', marginTop: { xs: '2em', md: '4em' } }}>
        <Grid container rowSpacing={4} columnSpacing={4} sx={{ width: { xs: '95%', sm: '85%', md: '75%' } }}>
          {
            notes.map(note => (
              <Grid item xs={6} sm={6} md={4} >
                <Card sx={{ border: '2px solid #a28bf0', boxShadow: '0px 0px 10px 0px #a28bf0' }}>
                  <CardContent>
                    <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontFamily: 'Anta', fontWeight: 'bold', fontSize: '1.2rem' }}>{note.title}</Typography>
                      <Typography sx={{ fontFamily: 'Anta', }}>from</Typography>
                      <Typography sx={{ fontFamily: 'Anta', fontWeight: 'bold', color: '#a28bf0', }}>#{note.name}</Typography>
                    </Stack>
                    <hr />
                    <Stack sx={{ height: { xs: '30vh', sm: '70vh', md: '30vh' }, overflow: 'scroll', marginTop: '0.8em' }}>
                      <Typography sx={{ fontFamily: 'Anta', }}>{note.description}</Typography>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row',gap:'1em', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton variant='contained'  sx={{ fontWeight: 'bold',background:'#a28bf0' ,'&:hover':{background:'black'}}} onClick={e => handleUpdate(note._id)}><AutoFixHighIcon fontSize='medium' sx={{color:'black','&:hover':{color:'white'}}}/></IconButton>
                      <IconButton variant='contained'  sx={{ fontWeight: 'bold',background:'#a28bf0','&:hover':{background:'black'} }}  onClick={e => handleDelete(note._id)}><DeleteIcon fontSize='medium' sx={{color:'black','&:hover':{color:'white'}}}/></IconButton>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Stack>
      {/* Form for updating */}
      <Dialog open={updateOpen} fullWidth minWidth='70%'>
        <Stack sx={{ padding: { xs: '0.4em', md: '2em' }}}>
        <DialogTitle sx={{color: '#a28bf0', textAlign: 'center', fontFamily: 'Anta' }}>{note._id}Update your NOTES {<CreateIcon/>}<IconButton color='primary' sx={{color: '#fa5760',float:'right'}} size='small' onClick={()=>setUpdateOpen(false)}><CloseOutlinedIcon/></IconButton></DialogTitle>
        <DialogContent sx={{display:'flex',flexDirection:'column',gap:'0.5em'}}>
          <TextField variant='standard' type='text' name='title' label='Update Title' InputLabelProps={{ style: { fontFamily: 'Anta', fontWeight: 'bold' } }} inputProps={{style:{fontFamily:'Anta',color:'black'}}} value={updateNote.title} onChange={handleUpdateChange}/>
          <TextField variant='standard' type='text' multiline name='description' label='Update Description' InputLabelProps={{ style: { fontFamily: 'Anta', fontWeight: 'bold' } }} inputProps={{style:{fontFamily:'Anta',color:'black'}}} value={updateNote.description} onChange={handleUpdateChange}/>
        </DialogContent>
        <DialogActions sx={{display:'flex',justifyContent:'center'}}>
          <Button variant='contained' sx={{ fontFamily: 'Anta', backgroundColor: '#a28bf0', fontWeight: 'bold', textTransform: 'capitalize', width: '30%', '&:hover': { backgroundColor: 'black' }}} size='small' onClick={e=>update(e,id)}>Update</Button>
         </DialogActions>
         </Stack>
      </Dialog>
      <Footer />
    </Stack>
  )
}

export default TaskPage
