import { BadgeRounded } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';



function ProfilePicture({online, photo, name, big = false, fromChat = false, smallLetter = false}) {
  const firstLetter = name.charAt(0).toUpperCase();
  const[photoData, setPhotoData] = useState(null);

  const checkPhoto =  async () => {
    if(photo != null){
      setPhotoData(`data:image\\png;base64,${photo}`);
    }
  };

  useEffect(() =>{
    checkPhoto();
  }, [photo]);

  return (
    <>
      {
        fromChat ==  true  ?         <Avatar sx={{width: !big ? '3rem' : '8rem', height: !big ? '3rem' : '8rem', fontSize:smallLetter ? '1.5rem' : '2rem', backgroundColor: '#D4D9E8'}}>
          {photo === null ? firstLetter : <img style={{height:!big ? '3rem' : '8rem'}} src={photoData} alt=""/>}
        </Avatar> : 
      
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
            <Avatar sx={{width: !big ? '3rem' : '8rem', height: !big ? '3rem' : '8rem', fontSize:smallLetter ? '1.5rem' : '2rem', backgroundColor: '#D4D9E8'}}>
              {photo === null ? firstLetter : <img style={{height:!big ? '3rem' : '8rem'}} src={photoData} alt=""/>}
            </Avatar>
          </Badge>
      }
    </>
  );
}

export default ProfilePicture;