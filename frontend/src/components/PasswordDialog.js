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

export default function PasswordDialog({ user, fetchUser }) {
  const [open, setOpen] = React.useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  
  const {id} = useParams();

  const url = 'http://localhost:3000/user/editPassword/' + id;

  const updatePassword = (newPassword) => {

    fetch(url, {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            password: newPassword
        })
    })
    .then(response => {
        fetchUser();
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error update password:', error);
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
      <Button variant="contained" color="secondary" onClick={handleClickOpen}> Promjena passworda </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            const password = formJson.password;
            const newFormData = new FormData(event.currentTarget);
            const newFormJson = Object.fromEntries((newFormData).entries());
            const newPassword = newFormJson.newPassword;
            let passwordLableOne = false;
            let passwordLableTwo = false;

            if(password !== user.password) {
                setPasswordError(true);
                passwordLableOne = true;
            } else {
                setPasswordError(false);
                passwordLableOne = false;
            }
            if (newPassword === user.password) {
                setNewPasswordError(true);
                passwordLableTwo = true;
            } else {
                setNewPasswordError(false);
                passwordLableTwo = false;
            }
            if(!passwordLableOne && !passwordLableTwo)  {
                updatePassword(newPassword);
                handleClose();
            }
          },
        }}
        sx={{
            '& .MuiDialog-paper': {
              width: '450px'
            },
          }}
      >
        <DialogTitle>Promjena passworda</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Za promjenu passworda, unesite trenutni, a zatim novi password!
          </DialogContentText>
          <TextField 
            required
            fullWidth
            name="password"
            label="Trenutni password"
            id="password"
            autoComplete="off"
            autoFocus
            type='password'
            variant="standard"
            margin="dense"
            error = {passwordError}
            helperText={passwordError ? 'Netačan password!' : ''}
            inputProps={{ maxLength: 20, minLength: 8 }}
           />
           <TextField 
            required
            fullWidth
            name="newPassword"
            label="Novi password"
            id="newPassword"
            autoComplete="off"
            autoFocus
            type='password'
            variant="standard"
            margin="dense"
            error = {newPasswordError}
            helperText={newPasswordError ? 'Password je isti kao trenutni!' : ''}
            inputProps={{ maxLength: 20, minLength: 8 }}
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