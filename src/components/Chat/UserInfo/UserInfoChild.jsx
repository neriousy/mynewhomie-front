import React, {useEffect, useState} from 'react';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { Alert, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Modal, Typography } from '@mui/material';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Button, ListItemAvatar, Avatar, List, ListItem, ListItemText, Stack, Slider } from '@mui/material';
import {LocationCity, SmokingRooms, SchoolOutlined, Pets, Work, Wc, WorkOutlined, PetsOutlined, Search} from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SearchProfileSpecific from '../../SearchProfileSpecific/SearchProfileSpecific';
import CloseIcon from '@mui/icons-material/Close';
import { useHousingConfirmation } from '../../../hooks/useHousingConfirmation';

function UserInfoChild({data}){
  const {searchDTO, characteristicsDTO , flatDTO} = data;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { askForConfirmation, status } = useHousingConfirmation();

  const closeDialog = async(statement) => {
    console.log(statement);
    if(statement == true){
      await askForConfirmation(searchDTO.id);
    }
    setOpenDialog(false);
  };


  return(
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        p: '34px',
        overflowY: 'auto'


      }}>
        <ProfilePicture online={searchDTO.online} photo={searchDTO.photo} name={searchDTO.firstname} big={true}/>
        <Typography
          sx={{
            fontSize: '20px',
            color: 'rgba(0, 0, 0, 0.87)',
            fontWeight: '500',
            lineHeight: '28px',
            mt: '1rem'  
          }}
        >{searchDTO.firstname} {searchDTO.lastname}</Typography>

        <Typography
          sx={{
            fontSize: '16px',
            color: '#797979',
            fontWeight: '400',
            lineHeight: '24px',
          }}
        >{searchDTO.age} lat</Typography>

        <Divider sx={{width: '100%', mt: '1rem'}}/>

        <List dense={false} disablePadding sx={{my: '2rem', width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <ListItem sx={{py: 0.5, px: 0}}>
            <ListItemAvatar>
              <Avatar sx={{background: '#fff', color: '#88888F'}}>
                <MapsHomeWorkOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'Szukam mieszkania w: ' + characteristicsDTO.livesIn}
              secondary={null}
            />
          </ListItem>

          <ListItem sx={{py: 0.5, px: 0}}>
            <ListItemAvatar>
              <Avatar sx={{background: '#fff', color: '#88888F'}}>
                <SchoolOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={characteristicsDTO.isStudent ? 'Jestem studentem' :  'Nie uczę się'}
              secondary={null}
            />
          </ListItem>

          <ListItem sx={{py: 0.5, px: 0}}>
            <ListItemAvatar>
              <Avatar sx={{background: '#fff', color: '#88888F'}}>
                <WorkOutlineOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={characteristicsDTO.works ? 'Pracuję' :  'Nie pracuję'}
              secondary={null}
            />
          </ListItem>

          <ListItem sx={{py: 0.5, px: 0}}>
            <ListItemAvatar>
              <Avatar sx={{background: '#fff', color: '#88888F'}}>
                <PetsOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={characteristicsDTO.hasPets ? 'Mam zwierzę' :  'Nie mam zwierząt'}
              secondary={null}
            />
          </ListItem>

          <ListItem sx={{py: 0.5, px: 0}}>
            <ListItemAvatar>
              <Avatar sx={{background: '#fff', color: '#88888F', transform: 'scaleX(-1)'}}>
                <SmokingRooms />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={characteristicsDTO.smokes ? 'Palę papierosy' :  'Nie palę papierosów'}
              secondary={null}
            />
          </ListItem>

          <ListItem sx={{py: 0.5, px: 0}}>
            <ListItemAvatar>
              <Avatar sx={{background: '#fff', color: '#88888F'}}>
                <PersonOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={characteristicsDTO.preferedGender == 'M' ? 'Płeć współlokatora: mężczyzna' :  characteristicsDTO.preferedGender == 'K' ? 'Płeć współlokatora: kobieta' : 'Płeć współlokatora: nie mam preferencji'}
              secondary={null}
            />
          </ListItem>

            
          <ListItem sx={{py: 0.5, px: 0}}>
            <ListItemAvatar>
              <Avatar sx={{background: '#fff', color: '#88888F'}}>
                {
                  characteristicsDTO.acceptsPets ?  <CheckCircleOutlineOutlinedIcon /> : <CancelOutlinedIcon />
                }
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={characteristicsDTO.acceptsPets ? 'Akceptuje zwierzęta w mieszkaniu' :  'Nie akceptuje zwierząt w mieszkaniu'}
              secondary={null}
            />
          </ListItem>

          <ListItem>
            <Divider sx={{width: '100%', mt: '1rem'}}/>
          </ListItem>

          <ListItem sx={{
            py: 0.5, px: 0,
            mt: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
            <Typography sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              gap: '0.2rem',
              fontSize: '1.1rem',
              color: '#1976D2',
              fontWeight: '500',
              width:'60%',
              pb: '0.5rem',
              ':hover': {
                cursor: 'pointer',
                textDecoration: 'underline'
              }

            }}
            onClick={handleOpen}
            >
              <PersonOutlineOutlinedIcon sx={{fontSize: '2rem'}} />
          Zobacz profil  <ArrowForwardIcon sx={{fontSize: '2rem', fontWeight: '500'}}/>
            </Typography>
          </ListItem>

          <Box sx={{mt: '2rem'}}>
            <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{fontSize:'1rem'}}>Potwierdź wspólne zamieszkanie</Button>
            {
              status === 200 ? <Alert severity="success">Wysłano prośbę o potwierdzenie wspólnego zamieszkania</Alert>  : <></>
            }
          </Box>
        </List>
      </Box>

      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Potwierdzenie wspólnego zamieszkania'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Czy na pewno chcesz wysłać prośbę o potwierdzenie wspólnego zamieszkania z {searchDTO.firstname}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog(false)}>Nie</Button>
          <Button onClick={() => closeDialog(true)}>Tak</Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute', 
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            width: '80%',
            height: '80%',
            overflowY: 'auto',
            p: '34px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',

          }}
        >
          <Button sx={{
            ml: 'auto',
            height: '30px',
            width: '30px',
            p: 0,
            borderRadius: '0',
            minWidth: 'unset',
          }}
          onClick={handleClose}
          >
            <CloseIcon sx={{color: '#000' }} />
          </Button>
          <SearchProfileSpecific data={data} handleClose={handleClose} fromChat={true}/>
        </Box>

      </Modal>
    </>
  );
}

export default UserInfoChild;