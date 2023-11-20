import { Box, Divider, Typography } from '@mui/material';
import React,  {useState, useEffect} from 'react';
import ProfilePicture from '../ProfilePicture';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarRating from '../../StarRating/StarRating';

function GridResult({data, openSpecificFunc}) {
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
    <Box sx={{
      backgroundColor: 'white',
      boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);',
      borderRadius: '10px',
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      padding:'0.5rem'
    }}>
      {
        score != -1 && <span style={{marginLeft: 'auto'}}> <StarRating rating={score}/>  </span>
      } 
      <Box>

        <ProfilePicture online={online} photo={showPhoto} name={firstname}/>

        <Box
          sx={{
            my: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.3rem'

          }}
        >
          <Typography sx={{
            fontSize: '1rem',
            fontWeight: '400',
          }}>{firstname}</Typography>

          <Typography sx={{
            fontSize: '0.8rem',
            fontWeight: '400',
            color:  '#666666'
          }}>{age} lat</Typography>

        </Box>
      </Box>
      
      <Divider sx={{width: '100%'}}/>

      <Typography sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.2rem',
        fontSize: '1.1rem',
        color: '#1976D2',
        fontWeight: '500',
        pb: '0.5rem',
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

export default GridResult;
