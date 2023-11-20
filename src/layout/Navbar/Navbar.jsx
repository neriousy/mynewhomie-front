import React from 'react';
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../../hooks/auth/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState, useRef } from 'react';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { usePhoto } from '../../components/MyProfileForm/PhotoForm/hooks/usePhoto';
import { Avatar, Backdrop, Box, CircularProgress, Divider, Modal, Typography } from '@mui/material';
import NavAvatar from '../../components/NavAvatar/NavAvatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import { LogoutOutlined } from '@mui/icons-material';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm/ForgotPasswordForm';

function Navbar(){
  const { logout } = useLogout();
  const { user, userData } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [formType, setFormType] = useState('login');



  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };
  const handleOpen = () => {
    setFormType('login');
    setModalOpen(true);
  };


  const handleLogout = (popupState) => {
    popupState.close();
    logout();
  };


  useEffect(() => {
    if(user){
      setData(JSON.parse(window.localStorage.getItem('userInfo')));
    }
  }, [user]);



  return(
    <>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navUl}>
          
            <li>
              <NavLink to='/' className={({ isActive }) => isActive ? styles.active : ''}>
                <span className={styles.logo}>
                  <RoofingOutlinedIcon sx={{color: '#007FFF', mr: 0.5, height: '25px', width: '25px'}} />
                My new homie
                </span>
              </NavLink>

            </li>

            {user
              ? <li><NavLink to='/search' className={({ isActive }) => isActive ? styles.active : ''}>Wyszukiwarka</NavLink></li>
              : <></>
            }

            {user
              ? <li><NavLink to='/chat' className={({ isActive }) => isActive ? styles.active : ''}>Chat</NavLink></li>
              : <></>
            }
            {/* {user
              ? <li><NavLink to='/opinions' className={({ isActive }) => isActive ? styles.active : ''}>Wystaw opinie</NavLink></li>
              : <></>
            } */}



            {!user
              ?
              <li>
                <Button onClick={handleOpen} style={{display: 'flex', justifyContent:'center', alignItems:'center', fontWeight: '600', fontSize: '14px', fontFamily:'Roboto', color: '#515151'}}>
                  <LogoutOutlined sx={{mr: 1}}/>
                  Zaloguj
                </Button>
              </li>
              : 
              <>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Typography
                        component="li"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{fontWeight: '500', fontSize: '14px', fontFamily:'Roboto', color: '#515151',

                        }}
                        {...bindTrigger(popupState)}

                      >
                        <NavAvatar/>
                        {(user)
                          ? <>{userData.firstname + ' ' + userData.lastname} <ArrowDropDownIcon sx={{position: 'relative', bottom: '2px'}}/> </>
                          : <></>    
                        }
                      </Typography>
                      <Menu sx={{
                        mt: 1,
                        mb: 0,
                        transformOrigin: 'left',
                        marginLeft: '-5vw', // Adjust the value as needed
                      }}

                      {...bindMenu(popupState)}>
                        <div style={{display: 'flex', flexDirection: 'column', padding: '1rem', minWidth: '18rem'}}>
                          <span>
                            {userData.firstname + ' ' + userData.lastname}
                          </span>

                          <span style={{fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.8)'}}>
                            {data['username']}
                          </span>

                        </div>
                        <Divider sx={{mt: 1}}/>
                        <MenuItem sx={{padding: 0}} 
                          onClick={popupState.close}>
                          <NavLink to='/myProfile' 
                            style={{padding: '10px 20px', width: '100%', height: '100%', borderBottom:'1px solid rgba(0,0,0, 0.1)', display: 'flex', justifyContent:'flex-start', alignItems: 'center'}} >
                            <AccountCircleOutlinedIcon sx={{mr: 2}}/>
                          Profil
                          </NavLink>
                        </MenuItem>


                        <MenuItem sx={{padding: 0}}
                          onClick={popupState.close}>
                          <NavLink to='/characteristics'
                            style={{padding: '10px 20px', width:'100%',  borderBottom:'1px solid rgba(0,0,0, 0.1)', display: 'flex', justifyContent:'flex-start', alignItems: 'center'}} >
                            <OtherHousesOutlinedIcon sx={{mr: 2}}/>
                          Cechy
                          </NavLink>
                        </MenuItem>
                        <MenuItem sx={{padding: 0}}
                          onClick={() => handleLogout(popupState)}
                          style={{padding: '10px 20px', width: '100%', height: '100%'}}>
                          <LogoutOutlined sx={{mr: 2}}/>
                          Wyloguj
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </>
            } 


          
          
          
          </ul>
        </nav>
      </header>
      
      <Modal
        open={modalOpen}
        onClose={handleClose}
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
          '@media (max-width: 768px)': {
            width: '80vw',
          },

        }}>
          {
            formType === 'login' ?  
            
              <>
                <LoginForm setType={setFormType} closeModal={handleClose}/>  
                <Divider sx={{mt: 2, mb: 2}}/>

                <Typography variant='body2' sx={{textAlign: 'center', color: 'rgba(0,0,0,0.6)'}}>
                Nie masz jeszcze konta? <span style={{color: '#007FFF', cursor: 'pointer'}} onClick={() => setFormType('register')}>Zarejestruj się</span>
                </Typography>

              </>
              :  <></>
          }
          {
            formType === 'register' ?
              <>
                <RegisterForm setType={setFormType}/>
              </>
              : <></>
          }

          {
            formType === 'forgot' ?

              <>
                <ForgotPasswordForm setType={setFormType}/>
              </>

              :
              <></>
          }
          
         
        </Box>
      </Modal>
      
    </>

  );

}

export default Navbar;