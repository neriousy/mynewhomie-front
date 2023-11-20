import React, {useState, useRef} from 'react';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Popover, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { CloudUpload, Delete } from '@mui/icons-material';
import  { usePhoto } from '../../../hooks/usePhoto';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { usePhotoContext } from '../../../hooks/usePhotoContext';
import HoverPicture from './HoverPicture';

function ProfilePicture() {
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const openMenu = Boolean(anchorEl);
  const { uploadPhoto, status, isLoading, deletePhoto } = usePhoto();
  const { photo } = usePhotoContext();
  const [photoFile, setPhotoFile] = useState();
  const [tempPhoto, setTempPhoto] = useState(photo);
  
  const fileInputRef = useRef(null);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openDialogFunc = async(event) => {
    event.preventDefault();
    setOpenDialog(true);
    
  };

  const closeDialog = async(statement) => {
    console.log(statement);

    if(statement){
      await deletePhoto();
    }

    setOpenDialog(false);
    setAnchorEl(null);
  };

  const closeModal = async() => {
    setOpenModal(false);
    setAnchorEl(null);
  };

  const openModalFunc = async(event) => {
    event.preventDefault();
    setOpenModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Do something with the selected file
    setPhotoFile(file);
    setTempPhoto(URL.createObjectURL(file));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const sendPicture = async(event) => {
    event.preventDefault();
    uploadPhoto(photoFile);

    setOpenModal(false);
    setAnchorEl(null);

  };






  return (
    <>
      <Avatar 
        sx={{width: '12rem',
          height: '12rem',
          marginBottom: '3rem',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
        alt="Profile picture"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
        src={!isHovered ? photo : null}
      >

        {
          isHovered ?  <HoverPicture/> : null
        }

    
      </Avatar>

      <Popover
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            width: 'fit-content', // Set the desired width for the Popover
          },
        }}
      >
        <MenuItem onClick={openModalFunc} sx={{p: '16px'}}>
          <ListItemIcon>
            <AddAPhotoIcon sx={{color: '#007FFF' }} />
          </ListItemIcon>

          <ListItemText >
            Dodaj zdjęcie
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={openDialogFunc} sx={{p: '16px'}}>
          <ListItemIcon>
            <Delete sx={{color: '#000'}}/>
          </ListItemIcon>

          <ListItemText>
            Usuń zdjęcie
          </ListItemText>
        </MenuItem>
      </Popover>

      <Dialog
        open={openDialog}
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
          <Button onClick={() => closeDialog(false)}>Nie</Button>
          <Button onClick={() => closeDialog(true)}>Tak</Button>
        </DialogActions>
      </Dialog>

      
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{  position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          width: '30vw',
          p: '24px',
          boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            width: '80vw',
          },
          

        }}>

          <Avatar 
            sx={{width: '12rem',
              height: '12rem',
              marginBottom: '3rem',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
            alt="Profile picture"

            id="basic-button"
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}

            src={tempPhoto}
          />

          <FormControl sx={{width: '100%'}}>
            <Typography sx={{color: '#000', fontSize: '1.2rem', my: 2, fontWeight: '500'}}>Dodawanie zdjęcia profilowego</Typography>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button variant="outlined" fullWidth color="primary" sx={{display: 'flex', justifyContent:'center', alignItems: 'center', fontSize:'1rem'}} onClick={handleButtonClick}>
                    Dodaj zdjęcie <CloudUpload sx={{ml: 2}}/>
              </Button>
            </div>
          </FormControl>

          <Button variant="contained" fullWidth color="primary" sx={{display: 'flex', justifyContent:'center', alignItems: 'center', fontSize:'1rem', my: 3}} onClick={sendPicture}>
                    Zapisz zmiany <SaveAltIcon sx={{ml: 2}}/>
          </Button>

        </Box>

      </Modal>


    </>
  );
}

export default ProfilePicture;
