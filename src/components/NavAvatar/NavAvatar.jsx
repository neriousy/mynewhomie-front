import React from 'react';
import { Avatar } from '@mui/material';
import { usePhoto } from '../MyProfileForm/PhotoForm/hooks/usePhoto';
import { useEffect } from 'react';
import { usePhotoContext } from '../../hooks/usePhotoContext';

function NavAvatar(){
  const { photo } = usePhotoContext();

  return(
    <Avatar alt="profile  picture" src={photo} sx={{marginRight: 1,
      '@media (max-width: 600px)': {  
        display: 'none'
      }
    
    }}/>
  );

}

export default NavAvatar;