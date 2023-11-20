import { Box, Divider, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import ProfilePicture from '../ProfilePicture';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { StarRate } from '@mui/icons-material';
import StarRating from '../../StarRating/StarRating';

function RowResult({data, openSpecificFunc}) {
  const  {firstname, lastname, age, gender, online, photo, id, score} = data;

  const [showPhoto,  setPhoto] = useState(null);

  const handleClick = () => {
    openSpecificFunc(id);
  };

  const checkPhoto =  async () => {
    if(photo != null){
      setPhoto(`data:image\\png;base64,${photo}`);
    }
  };

  useEffect(() =>{
    checkPhoto();
  }, []);

  return (
    <Box
      sx={{
        width:'100%',
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        isolation: 'isolate',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '10px',
      }}
    >
      
      <ProfilePicture online={online} photo={showPhoto} name={firstname}/>

      <Box
        sx={{
          my: 1,
          mx: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '0.3rem'

        }}
      >
        {
          score != -1 && <StarRating rating={score}/>
        }
        <Typography sx={{
          fontSize: '1.2rem',
          fontWeight: '400',
        }}>{firstname}</Typography>

        <Typography sx={{
          fontSize: '0.9rem',
          fontWeight: '400',
          color:  '#666666'
        }}>{age} lat</Typography>

      </Box>

      <Typography sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.2rem',
        fontSize: '1.1rem',
        color: '#1976D2',
        ml: 'auto',
        fontWeight: '500',
        ':hover': {
          cursor: 'pointer',
          textDecoration: 'underline'
        }
      }}
      onClick={handleClick}
      >
          Zobacz profil  <ArrowForwardIcon sx={{fontSize: '1.3rem', fontWeight: '500'}}/>
      </Typography>

      
    </Box>
  );
}

export default RowResult;