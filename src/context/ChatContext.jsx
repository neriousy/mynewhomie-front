import React, { createContext, useReducer, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Loader from '../layout/Loader/Loader';

// Create the context
export const ChatContext = createContext();

function convertToDate(year, month, day, hours, minutes, seconds, milliseconds) {
  return new Date(year, month - 1, day, hours, minutes, seconds, 0);
}

export const chatReducer = (state, action) => {
  switch (action.type) {
  case 'SEND_MESSAGE': {
    const { senderId, senderName, receiverId, receiverName, message, date } = action.payload;

    // Create a new chat message object
    const newMessage = {
      senderId,
      senderName,
      receiverId,
      receiverName,
      message,
      date,
      unread: true,
    };

    // Update the correspondents' chat history
    const updatedCorrespondents = state.correspondents.map((correspondent) => {
      if (correspondent.receiverId === receiverId) {
        const updatedChatHistory = [...correspondent.chatHistory, newMessage];
        return {
          ...correspondent,
          chatHistory: updatedChatHistory,
          lastMessage: newMessage,
          unread: false,
        };
      }
      return correspondent;
    });

    // Send the message via SockJS
    if (state.stompClient) {
      const stompClient = state.stompClient;
      const messageDTO = {
        senderId,
        receiverId,
        message,
        date,
      };
      stompClient.send('/app/private-chat', {}, JSON.stringify(messageDTO));
    }

    const sortedCorrespondents = updatedCorrespondents.sort(
      (a, b) => {
        if (!a.lastMessage) return 1;
        if (!b.lastMessage) return -1;
        return b.lastMessage.date.getTime() - a.lastMessage.date.getTime();
      }
    );

      

    return {
      ...state,
      correspondents: sortedCorrespondents,
      messageArrived: false, // Reset messageArrived after sending a message
    };
  }
  case 'GET_MESSAGES': {
    // Update correspondents' chat history
    const updatedCorrespondents = state.correspondents.map((correspondent) => {
      if (correspondent.receiverId === action.payload.senderId) {
        const updatedChatHistory = [...correspondent.chatHistory, action.payload];
        const lastMessage =  action.payload;
        lastMessage.date = convertToDate(lastMessage.date);
        return {
          ...correspondent,
          unread: true,
          lastMessage: action.payload,
          chatHistory: updatedChatHistory,
        };
      }
      return { ...correspondent };
    });

    const sortedCorrespondents = updatedCorrespondents.sort((a, b) => {
      console.log(a.lastMessage);
      console.log(b.lastMessage);
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return b.lastMessage.date.getTime() - a.lastMessage.date.getTime();
    });

    return {
      ...state,
      correspondents: sortedCorrespondents,
      messageArrived: true, // Set messageArrived to true when receiving a message
    };
  }
  case 'MARK_AS_READ': {
    const { correspondentId, lastReadMessageId } = action.payload;

    // Update correspondents' chat history
    const updatedCorrespondents = state.correspondents.map((correspondent) => {
      if (correspondent.receiverId === correspondentId) {
        const updatedChatHistory = correspondent.chatHistory.map((message) => {
          if (message.messageId <= lastReadMessageId) {
            return { ...message, read: true };
          }
          return message;
        });

        return {
          ...correspondent,
          chatHistory: updatedChatHistory,
          unread: false,
        };
      }
      return correspondent;
    });

    // Update lastReadHistory
    const updatedLastReadHistory = { ...state.lastReadHistory, [correspondentId]: lastReadMessageId };
    window.localStorage.setItem('lastReadHistory', JSON.stringify(updatedLastReadHistory));

    return {
      ...state,
      correspondents: updatedCorrespondents,
      lastReadHistory: updatedLastReadHistory,
    };
  }
  case 'LOGIN':{
    // Update correspondents' chat history

    const sortedCorrespondents = action.payload.updatedCorrespondents.sort(
      (a, b) => {
        if (!a.lastMessage) return 1;
        if (!b.lastMessage) return -1;
        return b.lastMessage.date.getTime() - a.lastMessage.date.getTime();
      }
    );
    return {
      ...state,
      correspondents: sortedCorrespondents,
      stompClient: action.payload.stompClient,
    };
  }

  case 'SET_MESSAGE_ARRIVED':
    return {
      ...state,
      messageArrived: action.payload,
    };

  case 'CREATE_NEW_CORRESPONDENT': {
    const { correspondent } = action.payload;
    
    // Create a new chat correspondent object
    const newCorrespondent = {
      receiverId: correspondent.id,
      receiverName: correspondent.name,
      photo: correspondent.photo,
      online: correspondent.online,
      chatHistory: [],
      lastMessage: null,
      unread: false,
    };

    const ifExists = state.correspondents.find((correspondent) => correspondent.receiverId === newCorrespondent.receiverId);
    
    if(!ifExists){
      const updatedCorrespondents = [...state.correspondents, newCorrespondent];
    
      return {
        ...state,
        correspondents: updatedCorrespondents,
      };
    }

    return{
      ...state,
    };
    // Add the new correspondent to the existing correspondents list
    
  }

  case 'LOGOUT':
    return {
      correspondents: [],
      stompClient: null,
      lastReadHistory: {},
      messageArrived: false,
    };



  default:
    return state;
  }
};

// Create a provider component for the context
export const ChatProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [correspondents, setCorrespondents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stompClient, setStompClient] = useState(null);
  let readHistory = JSON.parse(window.localStorage.getItem('readHistory')) || {};
  const [state, dispatchChat] = useReducer(chatReducer, {
    correspondents: [],
    stompClient: null,
    lastReadHistory: readHistory,
    messageArrived: false,
  });

  let socket;
  let stomp;
  let myId;

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      dispatchChat({ type: 'LOGOUT' });
      return;
    }
    myId = JSON.parse(window.localStorage.getItem('userInfo')).userId;
    readHistory = JSON.parse(window.localStorage.getItem('lastReadHistory'));

    if(readHistory === null) {
      readHistory = {};
    }


    // Simulating API call to fetch the list of correspondents
    const fetchCorrespondents = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/v1/messages/${myId}`);
        const correspondentsData = await response.json();

        const updatedCorrespondents = correspondentsData.map((correspondent) => {
          const chatHistory = correspondent.messages.map((message) => ({
            messageId: message.messageId,
            senderId: message.senderId,
            senderName: message.senderName,
            receiverId: message.receiverId,
            receiverName: message.receiverName,
            message: message.message,
            date: convertToDate(...message.date),
            unread: true,
          }));

          const lastMessage = chatHistory.length ? chatHistory[chatHistory.length - 1] : null;
          const lastReadMessageId = readHistory[correspondent.id];

          


          const isUnread = lastMessage && lastReadMessageId !== lastMessage.messageId;
          const unread = isUnread ? true : false;

          return {
            receiverId: correspondent.id,
            receiverName: correspondent.name,
            photo: correspondent.photo,
            online: correspondent.online,
            chatHistory,
            lastMessage,
            unread: unread
          };
        });

        setCorrespondents(updatedCorrespondents);

        dispatchChat({ type: 'LOGIN', payload: { updatedCorrespondents, stompClient: stomp, lastReadHistory: readHistory } }); // Assign stomp client to the payload
      } catch (error) {
        console.error('Error fetching correspondents:', error);
      }
    };

    socket = new SockJS(process.env.REACT_APP_API_URL + '/chat');
    stomp = Stomp.over(socket);
    setStompClient(stomp);
    stomp.connect({}, () => {
      console.log('Connected to the server');

      stomp.subscribe(`/user/${myId}/private`, (message) => {

        const newMessage = JSON.parse(message.body);

        // Update the chat history for the corresponding correspondent
        const ifExists = state.correspondents.find((correspondent) => correspondent.receiverId === newMessage.senderId);
        if (!ifExists) {
          fetchCorrespondents();
          dispatchChat({
            type: 'GET_MESSAGES',
            payload: newMessage,
          });
        }else{
          dispatchChat({
            type: 'GET_MESSAGES',
            payload: newMessage,
          });
        }


        setTimeout(() => {
          dispatchChat({ type: 'SET_MESSAGE_ARRIVED', payload: false });
        }, 4000);


      });
    });

    fetchCorrespondents();
    setIsLoading(false);

    return () => {
      stomp.disconnect(() => {
        console.log('Disconnected');
      });
    };
  }, [user]);

  // Mark a message as read
  const markMessageAsRead = (receiverId, messageId) => {
    // Dispatch the 'MARK_MESSAGE_READ' action to update the state
    dispatchChat({ type: 'MARK_MESSAGE_READ', payload: { receiverId, messageId } });
  
    // Update the last read message in local storage
    const updatedLastReadHistory = { ...state.lastReadHistory, [receiverId]: messageId };
    window.localStorage.setItem('lastReadHistory', JSON.stringify(updatedLastReadHistory));
  };



  console.log('ChatContext state: ', state);

  return (
    <>
      {user === null ? (
        <ChatContext.Provider
          value={{ ...state, dispatchChat, markMessageAsRead, messageArrived: state.messageArrived }} // Provide messageArrived value from state
        >
          {children}
        </ChatContext.Provider>
      ) : isLoading === true ? (
        <Loader />
      ) : (
        <ChatContext.Provider
          value={{ ...state, dispatchChat, markMessageAsRead, messageArrived: state.messageArrived }} // Provide messageArrived value from state
        >
          {children}
        </ChatContext.Provider>
      )}
    </>
  );
};
