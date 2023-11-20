import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, Divider, IconButton, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProfilePicture from './ProfilePicture/ProfilePicture';
import LastMessageDate from './LastMessageDate/LastMessageDate';
import UserInfo from './UserInfo/UserInfo';
import SendIcon from '@mui/icons-material/Send';
import ChatHistory from './ChatHistory/ChatHistory';
import { useChatContext } from '../../hooks/useChatContext';
import fuzzysort from 'fuzzysort';


const PrivateChat = () => {
  const  location  = useLocation();
  const[input, setInput] = useState('');
  const[currentCorrespondent, setCurrentCorrespondent] = useState(null);
  const[search,  setSearch] = useState('');
  const myId =  JSON.parse(window.localStorage.getItem('userInfo'))['userId'];
  const { dispatchChat, correspondents } = useChatContext();
  const[filteredCorrespondents, setFilteredCorrespondents] = useState(correspondents);
  

  const submitMessage =  async (e) => {
    e.preventDefault();

    
    if(input == ''){
      return;
    }

    const message = {
      senderId: myId,
      senderName: JSON.parse(window.localStorage.getItem('userInfo'))['username'],
      receiverId: currentCorrespondent.receiverId,
      receiverName: currentCorrespondent.receiverName,
      message: input,
      date: new Date(),
    };

    dispatchChat({ type: 'SEND_MESSAGE', payload: message });
  
    setInput('');
  };

  useEffect(() => {
    if(location.state?.receiverId != null){
      //createChannel(parseInt(location.state?.receiverId),location.state?.receiverName);
    }
  }, []);

  const handleCorrespondentClick = (correspondent) => {
    const updatedCorrespondent = {
      ...correspondent,
      unread: false,
    };

    setCurrentCorrespondent(updatedCorrespondent);
    dispatchChat({
      type: 'MARK_AS_READ',
      payload: {
        correspondentId: updatedCorrespondent.receiverId,
        lastReadMessageId:
          updatedCorrespondent.chatHistory[
            updatedCorrespondent.chatHistory.length - 1
          ]?.messageId,
      },
    });
  };

  useEffect(() => {
    if (correspondents.length > 0 && currentCorrespondent !== null) {
      const updatedCorrespondent =  correspondents.find((correspondent) => correspondent.receiverId === currentCorrespondent.receiverId);
      updatedCorrespondent.unread = false;
      if (updatedCorrespondent) {
        setCurrentCorrespondent(updatedCorrespondent);
      }
    }
  }, [correspondents]);

  useEffect(() => {
    if (search !== '') {
      const searchResults = fuzzysort.go(search, correspondents, { key: 'receiverName' });
      const filteredCorrespondents = searchResults.map(result => result.obj);
      setFilteredCorrespondents(filteredCorrespondents);
    } else {
      setFilteredCorrespondents(correspondents);
    }
  
  }, [search, currentCorrespondent, correspondents]);



  

  return (
    <Box sx={{
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '28px',
      width: '100%',
      height: '100%',
      display: 'flex',
      boxSizing: 'border-box',
    }}>

      <Box sx={{width: '24%',minWidth: '300px', backgroundColor: '#EAEBED', display:'flex',  alignItems: 'flex-start', p:'22px', flexDirection: 'column',
        '@media (max-width: 768px)': {
          width: '40%',
          p:'10px',
          minWidth: 'unset',
        }
      }}>
        <Typography
          sx={{
            fontSize: '20px',
            color: 'rgba(0, 0, 0, 0.87)',
            fontWeight: '500',
            lineHeight: '28px',
            padding: '0 0 0 20px',
            display: 'flex',
            alignItems: 'center',
            '@media (max-width: 768px)': {
              padding: '0'
            }
            
          }}
        >Czaty</Typography>

        <TextField
          variant="outlined"
          sx={{ width: '99%', marginTop: '20px', backgroundColor: '#fff', mx: 0 }}
          InputProps={{
            startAdornment: (
              <React.Fragment>
                <SearchIcon color="action" />
              </React.Fragment>
            ),
            placeholder: 'Wyszukaj',
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Box sx={{width: '100%', height: '100%', overflowY: 'scroll', marginTop: '20px',
          scrollbarWidth: 'thin', // For Firefox compatibility
          scrollbarColor: 'transparent transparent', // For Firefox compatibility
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-thumb': {
            backgroundColor: '#757575',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },}}>
          {filteredCorrespondents.map((correspondent) => (
            <Box
              key={correspondent.receiverId}
              sx={{
                width: '100%',
                minWidth: '100px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                borderRadius: '4px',
                marginTop: '20px',
                cursor: 'pointer',
                flex: 1,
                border: '1px solid  transparent',
                p: '15px 15px 15px 0',
                backgroundColor: currentCorrespondent != null  && currentCorrespondent.receiverId === correspondent.receiverId ? '#F9FAFB' : 'transparent',

                '&:hover': {
                  borderColor: '#1976D2'
                },

                '@media (max-width: 768px)': {
                  minWidth: 'unset',
                  p: '5px 5px 5px 0',
                }
              }}
              onClick={() => handleCorrespondentClick(correspondent)}
            >
              <Box sx={{width: '5rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ProfilePicture photo={correspondent.photo} name={correspondent.receiverName} online={correspondent.online} smallLetter={true}/>
              </Box>

              <Box sx={{flex: '1', width:'100%'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography
                    sx={{ 
                      fontSize: '16px',
                      color: 'rgba(0, 0, 0, 0.87)',
                      fontWeight: '500',
                      lineHeight: '28px',
                      
                    }}
                  >{correspondent.receiverName}</Typography>

                  {correspondent.unread && <Box sx={{width: '10px', height:'10px',  backgroundColor: '#1976D2', borderRadius: '50%'}}  />}
                </Box>

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width:'100%',
                  '@media (max-width: 768px)': {
                    display: 'none'
                  }
                }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: correspondent.unread ? '#1976D2' : '#515151',
                      fontWeight: correspondent.unread ? '500' :  '400',
                      lineHeight: '20px',
                    }}
                  >
                    {correspondent.lastMessage !== null ? (correspondent.lastMessage.senderId ===  myId ? 'Ty: ' : '') : <></>}
                    {correspondent.lastMessage !== null ? (correspondent.lastMessage.message.length > 10 ? correspondent.lastMessage.message.substring(0, 10) + '...' : correspondent.lastMessage.message) : <></>}
                  </Typography>
                  {
                    correspondent.lastMessage !== null && <LastMessageDate date={correspondent.lastMessage.date}/>
                  }
                  
                </Box>
              </Box>
              
            </Box>
          ))}
        </Box>


      </Box>

      <Box sx={{background:'#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', p: '1rem', flex: 1}}>
        {
          !currentCorrespondent &&
            <Box sx={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Typography
                sx={{
                  fontSize: '20px',
                  color: 'rgba(0, 0, 0, 0.87)',
                  fontWeight: '500',
                  lineHeight: '28px',
                }}
              >Wybierz czat</Typography>
            </Box>
        }


        {
          currentCorrespondent &&
          <>
            <Box sx={{
              width: '100%',
              height: '72px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              px: '1rem',
              '@media (max-width: 768px)': {
                display:'none'
              }

            }}>
              <Box>
                <ProfilePicture photo={currentCorrespondent.photo} smallLetter={true} name={currentCorrespondent.receiverName} online={currentCorrespondent.online}/>
              </Box>
              <Typography sx={{
                fontSize: '20px',
                color: 'rgba(0, 0, 0, 0.87)',
                fontWeight: '500',
                ml: '1rem',
                '@media (max-width: 768px)': {
                  'fontSize': '16px' 
                }

              }}>
                {currentCorrespondent.receiverName}
              </Typography>

            </Box>

            <Divider sx={{width: '97%', mt: 1,
              '@media (max-width: 768px)': {
                display:'none'
              }
            }}/>


            
          </>
        }
        <Box sx={{display: 'flex', height: '90%',width:'100%', overflow: 'hidden'}}>
          {
            currentCorrespondent &&  <ChatHistory currentCorrespondent={currentCorrespondent} chatHistory={currentCorrespondent.chatHistory}/>
          }


        </Box>

        <Box component="form" onSubmit={submitMessage} sx={{width: '100%',  display: 'flex', gap:'1rem', flexDirection: 'row'}} >
          <TextField placeholder="Wpisz nowa wiadomosc"  value={input} onChange={(e) => setInput(e.target.value)} sx={{width: '85%'}}/>
          <Button variant="contained" type="submit" sx={{height: '100%', width:'10%'}} disabled={currentCorrespondent === null} onClick={submitMessage} > <SendIcon/> </Button>
        </Box>
      </Box>

      <Box sx={{width:'24%', minWidth:'200px' ,  backgroundColor: '#fff', borderLeft: '1px solid rgba(0,0, 0, 0.12)', overflow: 'hidden',
        '@media (max-width: 768px)': {
          display: 'none'
        }
      }}>
        {currentCorrespondent && (
          <UserInfo id={currentCorrespondent.receiverId} />
        )}

        
      </Box>


    </Box>

    
  );
};

export default PrivateChat;