import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const DeleteFromHome = ({ id, isOpen, closingDialog, deleteItem }) => {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpen(false);
    closingDialog();
    isOpen = false;
  };

  const handleClose2 = () => {
    deleteItem(id);
    setOpen(false);
    closingDialog();
    isOpen = false;
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Jeste li sigurni da želite obrisati odabranu stavku?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odustani</Button>
          <Button onClick={handleClose2}>
            Potvrdi
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default DeleteFromHome;