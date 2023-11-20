import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import Message from './Message/Message';

function ChatHistory({ currentCorrespondent, chatHistory }) {
  const myId = JSON.parse(window.localStorage.getItem('userInfo')).userId;
  const { photo } = currentCorrespondent;
  const boxRef = useRef(null); // Create a ref for the box element
  
  useEffect(() => {
    // Scroll to the bottom of the box element after every render
    boxRef.current.scrollTop =  boxRef.current.scrollHeight;
  }, [chatHistory, currentCorrespondent]);


  useEffect(() => {
    // Scroll to the bottom of the box element on first load
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, []); // Empty dependency array ensures it only runs once after the first render

  return (
    <Box sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }} ref={boxRef}>
      {chatHistory && chatHistory.length > 0 && chatHistory.map((message, index) => (
        <Message
          index={index}
          key={index}
          senderId={message.senderId}
          message={message.message}
          isLastInRow={index === chatHistory.length - 1 || message.senderId !== chatHistory[index + 1].senderId}
          showProfilePicture={message.senderId !== myId}
          photo={photo}
          name={currentCorrespondent.receiverName}
          date={message.date}
        />
      ))}
    </Box>
  );
}

export default ChatHistory;
