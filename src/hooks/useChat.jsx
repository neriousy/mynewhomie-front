import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAuthContext } from '../hooks/useAuthContext';


export const useChat = () => {
  const { user } = useAuthContext();


};