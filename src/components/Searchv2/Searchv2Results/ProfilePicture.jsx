import { BadgeRounded } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';



function ProfilePicture({online, photo, name}) {
  const firstLetter = name.charAt(0).toUpperCase();

  return (

    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      sx={{
        '& .MuiBadge-badge': {
          width: '1.1rem',
          height: '1.1rem',
          backgroundColor: online ? '#44B700' : '#ff0000',
          borderRadius: '50%',
          border: '3px solid #fff'
        },
      }}
    >
      <Avatar sx={{width: '6rem', height:'6rem', fontSize:'3rem', backgroundColor: '#D4D9E8'}}>
        {photo === null ? firstLetter : <img style={{height:'6rem'}} src={photo} alt=""/>}
      </Avatar>
    </Badge>
  );
}

export default ProfilePicture;
