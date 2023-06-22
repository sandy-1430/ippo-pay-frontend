import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Alert, Button, List, ListItem, ListItemButton, ListItemText, Slide, Snackbar, TextField, Typography } from '@mui/material';

function App() {
  const [list, setList] = useState()
  const [input, setInput] = useState()
  const [open, setOpen] = useState(false);

  const getList = async () =>{
    const { data } = await axios.get("/retrive");
    setList(data.lists)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await axios.post("/create",{
      list: input
    }).then((res)=>{
      if(res.status === 200){
        setOpen(true)
        getList()
      }
    })
  }

  const handleClose = () =>{
    setOpen(false)
  }

  useEffect(() => {
    getList()
  }, [])

  console.log(list);
  
  
  return (
    <div className="App">
      <div className='lists'>
        <form onSubmit={(e)=> handleSubmit(e)}>
          <TextField
            id="input" 
            label="Enter List" 
            variant="standard" 
            fullWidth
            value={input}
            onChange={(e)=>setInput(e.target.value)}
          />
          <Button 
            variant="contained" 
            type='submit'
            disabled={input ? false : true}
          >Add</Button>
        </form>
        <List>
          <Typography variant='h5' align='left' mb={3} color="primary" sx={{fontWeight: "bold"}}>To Lists</Typography>
          {
            list?.map((item)=>(
              <ListItem disablePadding key={item._id} sx={{border: "1px solid #1976d2", margin: "0 0 20px", borderRadius: "5px"}}>
                <ListItemButton>
                  <ListItemText color='primary' primary={item.list} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>

          <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={"Fade"}
            message="I love snacks"
            key={<Slide direction="up" />}
            autoHideDuration={5000}
          >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              List Added Successfully
            </Alert>
          </Snackbar>
      </div>
    </div>
  );
}

export default App;
