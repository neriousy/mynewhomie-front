import React, { useState } from 'react';
import { Grid, TextField, Container, Box, MenuItem, Avatar,Typography, Select, Button, Alert } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import temp from '../../../assets/img/temp-profile.png';
import styles from './PhotoForm.module.scss';
import { usePhoto } from '../../../hooks/usePhoto';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { usePhotoContext } from '../../../hooks/usePhotoContext';
function PhotoForm(){
  const { uploadPhoto, status, blobUrl, isLoading, deletePhoto } = usePhoto();
  const [photoFile, setPhotoFile] = useState();
  const [open, setOpen] = useState(false);
  const { photo } = usePhotoContext();

  const sendPicture = async(event) => {
    event.preventDefault();
    uploadPhoto(photoFile);

  };

  const openDialog = async(event) => {
    event.preventDefault();
    setOpen(true);
    
  };

  const handleClose = async(statement) => {
    console.log(statement);

    if(statement){
      await deletePhoto();
      setOpen(false);
    }

    setOpen(false);
  };

  const checkFile =  async(e) =>{
    const file = e.target.files[0];
    const size = file.size;
    const type = file.type;

    if(size > 5000000){
      alert('Zdjęcie jest za duże');
      return;
    }
    if(type !== 'image/jpeg' && type !== 'image/png'){
      console.log('Zły format pliku');
      return;
    }
    setPhotoFile(e.currentTarget.files[0]);
  };
  

  return(
    <>
      <Box component="form" encType='multipart/form-data' onSubmit={sendPicture} sx={{width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop: 6}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Zmień zdjecie profilowe
        </Typography>


        <img className={styles.profilePicture} src={photo} alt='Your profile picture' />
        <div >
          <label className={styles.label}>
            <input type="file" required onChange={e => (checkFile(e))}/>
            <span>Wybierz zdjecie </span>
          </label>

        </div>
        <span className={styles.additionalInfo}> zdjęcia do 5MB</span>
        <div className={styles.spacer}> 
          <Button  sx={{ mt: 3, alignSelf: 'flexEnd' }} variant="contained" disabled={isLoading}  type="submit">Zapisz zdjęcie</Button>
          <Button  sx={{ mt: 3, alignSelf: 'flexEnd' }} variant="contained" disabled={isLoading}  type="button"
            onClick={openDialog}>Usuń zdjęcie</Button>
        </div>    
        {status === 200 ? <Alert variant="filled" sx={{m: 1}} severity="success">Zdjęcie zaaktualizowa pomyślnie.</Alert>  : <></>}
        {status === 204 ? <Alert variant="filled" sx={{m: 1}} severity="success">Pomyślnie usunięto zdjęcie.</Alert>  : <></>}
      </Box>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Usuwanie zdjęcia profilowego'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Czy na pewno chcesz usunąć swoje zdjęcie profilowe?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Nie</Button>
          <Button onClick={() => handleClose(true)}>Tak</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PhotoForm;