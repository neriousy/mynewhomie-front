import { Typography } from '@mui/material';
import React from 'react';

const LastMessageDate = ({ date }) => {
  const messageDate = new Date(date);
  const currentDate = new Date();

  const isToday = messageDate.toDateString() === currentDate.toDateString();
  let formattedDate;

  if (isToday) {
    // Display hour and minute if the date is from today
    formattedDate = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    // Display day and month if the date is not from today
    formattedDate = messageDate.toLocaleDateString([], { day: 'numeric', month: 'numeric' });
  }

  return <Typography sx={{
    fontSize: '14px',
    color: '#515151',
    fontWeight: '400',
    lineHeight: '20px',
  }}>{formattedDate}</Typography>;
};

export default LastMessageDate;
