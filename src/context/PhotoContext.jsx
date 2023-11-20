import React, { createContext, useReducer, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import temp from  './../assets/img/temp-profile.png';
import Loader from '../layout/Loader/Loader';
import { usePhoto } from '../hooks/usePhoto';
import Characteristicsv2 from '../components/Characteristicsv2/Characteristicsv2';

export const PhotoContext = createContext();

export const photoReducer = (state, action) => {

  switch (action.type) {
  case 'LOGIN':
    return { photo: action.payload };
  case 'DELETE':{
    return { photo: temp };
  }
  default: 
    return state;
  }
};
export const PhotoContextProvider = ( { children }) => {
  const { user } =  useAuthContext();

  const fetchData = async () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if(user){

      let userId = JSON.parse(window.localStorage.getItem('userInfo'))['userId'];
      let token  = JSON.parse(window.localStorage.getItem('user'))['token'];
      let url;

     
      const data = await fetch(process.env.REACT_APP_API_URL + `/api/v1/download/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token},
        credentials: 'include'
      });

      if(data.status !== 200){
        return temp;
      }
        
      url = URL.createObjectURL(await data.blob());
      return url;
    }else{
      return temp;
    }
  };
  const [state, dispatchPhoto] = useReducer(photoReducer, {
    photo: null
  });

    
  const[isLoading, setIsLoading] = useState(true);
  
  
  
  useEffect(() =>{  
    if(user){
      setTimeout(() =>  {
        fetchData().then((url) => {
          dispatchPhoto({type: 'LOGIN', payload: url});
          setIsLoading(false); 
        });  
      }, 0);
    }else{
      dispatchPhoto({type: 'DELETE'});
      setIsLoading(false);
    }

    
  },  [user]);

  console.log('PhotoContext state: ', state);

  


  return (
    isLoading === true ? <Loader/> :
      <PhotoContext.Provider value={{...state, dispatchPhoto}}>
        { children }
      </PhotoContext.Provider>
  );

};