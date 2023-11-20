import React from 'react';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { Box, Tooltip, Typography } from '@mui/material';
import { Maximize } from '@mui/icons-material';

const Message = ({index, senderId, message, isLastInRow, showProfilePicture, photo,  name, date }) => {

  const myId =  JSON.parse(window.localStorage.getItem('userInfo'))['userId'];
  const isMyMessage = senderId === myId;
  const backgroundColor = isMyMessage ? '#1976D2' : '#EAEBED';
  const color = isMyMessage ? '#FFFFFF' : '#1F1F1F';
  const borderRadius = !isMyMessage ? '16px 16px 16px 0px' : '16px 16px 0px 16px';

  const messageDate = new Date(date);
  const currentDate = new Date();

  const isToday = messageDate.toDateString() === currentDate.toDateString();
  let formattedDate;


  if (isToday) {
    // Display hour and minute if the date is from today
    formattedDate = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    // Display day and month if the date is not from today
    formattedDate = messageDate.toLocaleDateString([], { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
      alignItems: 'center',
      pl: isMyMessage === false && showProfilePicture === true && isLastInRow ===  false ? '4rem' : '0px',
      '@media (max-width: 600px)': {
        pl: '0'
      }
    }}>
      {showProfilePicture && isLastInRow && !isMyMessage &&

           <Box sx={{mr: '1rem', position: 'relative', top: '1.5rem',
             '@media (max-width: 600px)': {
               display: 'none',
             }
           }}>
             <ProfilePicture name={name} photo={photo} fromChat={true} smallLetter={true} alt="Profile" />
           </Box>

      }
      <Tooltip title={formattedDate} placement="right">
        <Typography
          sx={{
            position: 'relavtive',
            backgroundColor: backgroundColor,
            color: color,
            width: 'fit-content',
            maxWidth: '50%',
            borderRadius: borderRadius,
            p: '1rem',
            wordWrap: 'break-word',
            '@media (max-width: 600px)': {
              maxWidth: '90%',
            }

          }}
        >
          {message}
        </Typography>
      </Tooltip>
      
      
    </Box>
  );
};

export default Message;
