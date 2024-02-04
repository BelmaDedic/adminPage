import { Avatar, Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { green } from "@mui/material/colors";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from "react-router-dom"; 

const AddAirsoftItem = () => {
    const [title, setTitle] = useState('');
    const [required, setRequired] = useState(null);

    const navigate = useNavigate();

    const storedUserJSONString = localStorage.getItem('user');
    const user = storedUserJSONString ? JSON.parse(storedUserJSONString) : null;

    useEffect(() => {
        if(user === null){
          navigate('/');
        }
      }, [])

    const url = 'http://localhost:3000/AirsoftItem/new';

    const addItem = (e) => {
        e.preventDefault();

        fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                title: title,
                required: required
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            navigate('/AdminDashboard');
        })
        .catch(error => {
            console.error('Error adding item:', error);
        });
    }

    return ( 
        <div className="addAirsoftItem" style={{height: "100%"}}>
            <Link to="/AdminDashboard" className="linkTitle" style={{textDecoration: "none", color: "black"}}>
                <KeyboardBackspaceIcon style={{marginTop: "-2%", paddingLeft: "2%"}}/>
            </Link>
            <Avatar className="avatar" sx={{ bgcolor: green[500] }}>
                < AddCircleOutlineIcon />
            </Avatar>
             <Typography variant="h5" gutterBottom component="div" mb={ 3 } textAlign={"center"} sx={{ cursor: "default" }}>
                Unesite novu stavku za airsoft susret
            </Typography>
            <div className="formAddItem">
                <form onSubmit={addItem}>
                    <TextField fullWidth type="text" id="outlined-input" color="success" label="Naziv" 
                    autoComplete="off" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    <br/>
                    <InputLabel className="label" style={{fontWeight: 'bold'}}>
                        Odaberite obaveznost stavke*
                    </InputLabel>
                    <label className="radio">
                        <input
                        type="radio"
                        name="required"
                        value="true"
                        onChange={(e) => setRequired(e.target.value)}
                        required={required === null}
                        /> Da
                    </label>
                    <br/>
                    <label className="radio">
                        <input
                        type="radio"
                        name="required"
                        value="false"
                        onChange={(e) => setRequired(e.target.value)}
                        required={required === null}
                        /> Ne
                    </label>
                    <br/>
                    <Box textAlign='center'  position="absolute" bottom={0} left={0} right={0} p={2}>
                        <Button type="submit" variant="contained" color="success" className="submit">DODAJ STAVKU</Button>
                    </Box>
                </form>
            </div>
        </div>
    );
}

export default AddAirsoftItem;