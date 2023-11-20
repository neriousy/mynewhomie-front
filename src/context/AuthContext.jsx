import React, { createContext, useReducer, useEffect, useState } from 'react';
import JSZip from 'jszip';
import { getUserInfo, updateOnline } from '../hooks/useUserInfo';
import Loader from '../layout/Loader/Loader';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  let interval;
  switch (action.type) {
  case 'LOGIN':{
    sessionStorage.removeItem('profilePicture');
    const email = JSON.parse(window.localStorage.getItem('userInfo'))[
      'username'
    ];
    setTimeout(() => {
      updateOnline(email, token);
    },  0);
    
    const token = JSON.parse(window.localStorage.getItem('user'))['token'];
    interval = setInterval(() => updateOnline(email, token), 60000);
    
    return { user: action.payload.user,
      userData: action.payload.userData,
      characteristics: action.payload.characteristics,
      flatPhotos: action.payload.flatPhotos,
      active: interval
    };
  }

  case 'LOGOUT':{
    clearInterval(state.active);
    return {user: null,
      active: null
    };

  }

  case 'SET-DATA':{
    return {...state, userData: action.payload};
  }

  case 'SET-CHAR':{
    return {...state, characteristics: action.payload};
  }

  case 'SET-FLAT-PHOTOS':{
    return {...state, flatPhotos: action.payload};
  }

  
  default: 
    return state;
  }
};
export const AuthContextProvider = ( { children }) => {
  let temp;
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatchAuth] = useReducer(authReducer, {
    user: null,
    active: null,
    userData: null,
    characteristics: null,
    flatPhotos: []
  });
  

  const getUserInfo = async(token) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/userInfo', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token},
      body: JSON.stringify(token),
      credentials: 'include'
    });

    if(response.status === 204){
      return false;
    }

    if(response.status === 200){
      const json = await response.json();
      window.localStorage.setItem('userInfo', JSON.stringify(json));
      return json;
    }
  };

  const getFlatPhotos = async (id, token) => {
    const response = await fetch(process.env.REACT_APP_API_URL + `/flat/photos/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      credentials: 'include'
    });

    if (response.status === 204) {
      return false;
    }

    if (response.status === 200) {
      const blob = await response.blob();
      const zip = await JSZip.loadAsync(blob);
      const extractedImages = [];

      for (const [relativePath, file] of Object.entries(zip.files)) {
        if (file.dir) continue;
        const imageBlob = await file.async('blob');
        const imageUrl = URL.createObjectURL(imageBlob);
        const imageObject = { id: extractedImages.length + 1, url: imageUrl };
        extractedImages.push(imageObject);
      }

      return extractedImages;
    }
    return [];
  };

  const getCharacteristics = async (id, token) => {
    let json = null;
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/getUserChar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(id),
      credentials: 'include'
    });

    if (response.status === 204) {
      return false;
    }

    if (response.status === 200) {
      json = await response.json();
    }

    return json;
  };



  const getAllData = async(user) =>{
    let userData = await getUserInfo(user.token);
    let characteristics = await getCharacteristics(userData.userId, user.token);
    let photos = await getFlatPhotos(userData.userId, user.token);
    console.log(photos);
    dispatchAuth({type: 'LOGIN', payload: {user: user, userData: userData, characteristics: characteristics, flatPhotos: photos}});
    setIsLoading(false);
  };


  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      getAllData(user);
    }
    if(!user){
      setIsLoading(false);
    }

    
    
  }, []);

  console.log('AuthContext state: ', state);


  return (
    
    isLoading == true ? <Loader/> :
      <AuthContext.Provider value={{...state, dispatchAuth}}>
        { children }
      </AuthContext.Provider>
  );

};