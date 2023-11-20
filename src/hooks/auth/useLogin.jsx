import { useState } from 'react';
import { useAuthContext } from '../useAuthContext'; 
import { useGetCharacteristics } from '../characteristics/useGetCharacteristics';
import { usePhotoContext } from '../usePhotoContext';
import JSZip from 'jszip';
import { updateOnline } from '../useUserInfo';
import temp from '../../assets/img/temp-profile.png';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatchAuth } = useAuthContext();
  const { dispatchPhoto } = usePhotoContext();
  const [status, setStatus] = useState(null);
  const { getChars } = useGetCharacteristics(); 

  const getUserInfo = async(token) => {
    const response = await fetch('https://my-new-homie-backend.herokuapp.com' + '/api/v1/userInfo', {
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
    const response = await fetch('https://my-new-homie-backend.herokuapp.com' + `/flat/photos/${id}`, {
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
    const response = await fetch('https://my-new-homie-backend.herokuapp.com' + '/api/v1/getUserChar', {
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
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('https://my-new-homie-backend.herokuapp.com' + '/api/v1/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
      credentials: 'include'
    });
 
    if(response.status === 423) {
      setIsLoading(false);
      setStatus(423);
      setError('Potwierdz adres email');
      return;
    }

    if(response.status === 403){
      setIsLoading(false);
      setStatus(403);
      setError('Podano nie poprawne dane logowania');
      return;
    }

    if(!response.ok){
      setIsLoading(false);
      setStatus(500);
      setError('Sprobuj ponownie pozniej');
      return;
    }


    let photo =  temp;
    if(response.ok) {

      const json = await response.json();
      window.localStorage.setItem('user', JSON.stringify(json));
      getAllData(json);
      setIsLoading(false);
      setStatus(200);
      
    }



  }; 

  return { login, isLoading, error, status };
}; 