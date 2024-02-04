import * as React from 'react';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function UsernameDialog({ user, fetchUser }) {
  const [open, setOpen] = React.useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const {id} = useParams();

  const url = 'http://localhost:3000/user/editUsename/' + id;

  const updateUsername = (userUsername) => {

    fetch(url, {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            username: userUsername
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(() => {
        fetchUser();
    })
    .catch(error => {
        console.error('Error update username:', error);
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}> Promjena usernama </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            const username = formJson.username;
            if(username === user.username) {
                setUsernameError(true);
            } else {
                setUsernameError(false);
                updateUsername(username);
                handleClose();
            }
          },
        }}
        sx={{
            '& .MuiDialog-paper': {
              width: '450px', 
            },
          }}
      >
        <DialogTitle>Promjena korisničkog imena</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Unesite novo korisničko ime!
          </DialogContentText>
          <TextField 
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="off"
            autoFocus
            type='text'
            variant="standard"
            margin="dense"
            error = {usernameError}
            helperText={usernameError ? 'Unijeli ste isti username!' : ''}
            inputProps={{ maxLength: 20, minLength: 5 }}
           />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odustani</Button>
          <Button type="submit">Spremi</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}