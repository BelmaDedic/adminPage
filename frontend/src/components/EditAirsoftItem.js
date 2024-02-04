import { Avatar, Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { pink } from "@mui/material/colors";
import { Link } from "react-router-dom"; 

const EditAirsoftItem = () => {
    const [title, setTitle] = useState('');
    const [required, setRequired] = useState(null);
    const[item, setItem] = useState(null);

    const navigate = useNavigate();
    const {id} = useParams();

    const storedUserJSONString = localStorage.getItem('user');
    const user = storedUserJSONString ? JSON.parse(storedUserJSONString) : null;

    useEffect(() => {
        if(user === null){
          navigate('/');
        }else {
            fetchAirsoftItems();
        }
      }, [])

    const fetchAirsoftItems = async () => {
        const data = await fetch('http://localhost:3000/AirsoftItem/edit/' + id);
        const fetchedItem = await data.json();
        setItem(fetchedItem);
        setTitle(fetchedItem.title);
        setRequired(fetchedItem.required);
    };

    const url = 'http://localhost:3000/AirsoftItem/edit/' + id;

    const editItem = (e) => {
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
            console.error('Error editing item:', error);
        });
    }

    return ( 
        <div className="editAirsoftItem" style={{height: "100%"}}>
            <Link to="/AdminDashboard" className="linkTitle" style={{textDecoration: "none", color: "black"}}>
                <KeyboardBackspaceIcon style={{marginTop: "-2%", paddingLeft: "2%"}}/>
            </Link>
            <Avatar className="avatar" sx={{ bgcolor: pink[500] }}>
                < ModeEditOutlineOutlinedIcon/>            
            </Avatar>
             <Typography variant="h5" gutterBottom component="div" mb={ 3 } textAlign={"center"} sx={{ cursor: "default" }}>
                Izmijenite podatke za stavku
            </Typography>
            <div className="formEditItem">
                <form onSubmit={editItem}>
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
                            checked={required === true}
                            onChange={() => setRequired(true)}
                        /> Da
                    </label>
                    <br />
                    <label className="radio">
                        <input
                            type="radio"
                            name="required"
                            value="false"
                            checked={required === false}
                            onChange={() => setRequired(false)}
                        /> Ne
                    </label>
                    <br/>
                    <Box textAlign='center'  position="absolute" bottom={0} left={0} right={0} p={2}>
                        <Button type="submit" variant="contained" color="success" className="submit">SPREMI IZMJENE</Button>
                    </Box>
                </form>
            </div>
        </div>
    );
}

export default EditAirsoftItem;