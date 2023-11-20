// import io from  'socket.io-client';
import { useEffect, useState } from 'react';


export const useSocket = () => {
  const[isLoading, setIsLoading] = useState(false);

  // const socket = io('http://localhost:8080/ws');
  // const token = localStorage.getItem('token');

  // useEffect(() =>{
  //   setIsLoading(true);
  //   socket.on('connect', () => {
  //     socket.emit('/app/chat.getChatHistory', { token: token }); //send the jwt
  //   });
  //   setIsLoading(false);
  // }, []);


  // return {socket};
};