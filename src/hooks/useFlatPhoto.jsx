import { useEffect, useState } from 'react';
import temp from '../assets/img/temp-profile.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthContext } from './useAuthContext';

export const useFlatPhoto = () => {
  const { user } = useAuthContext();
  const [blobUrl, setBlobUrl] = useState(temp);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  let userId;
  let token;


  const uploadFlatPhoto = async (photos) =>{
    const formData = new FormData();

    // Append each file to the formData
    
    photos.forEach((image, index) => {
      formData.append('files', image);
    });
  
  
    setIsLoading(true);
    setError(null);

    try{
      userId = JSON.parse(window.localStorage.getItem('userInfo'))['userId'];
      token  = JSON.parse(window.localStorage.getItem('user'))['token'];
    }catch{
      setStatus(400);
      setIsLoading(false);
      return;
    }
    
    const response = await fetch(process.env.REACT_APP_API_URL + '/flat/add-photo', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token},
      body: formData,
      credentials: 'include'
    });

    if(response.status === 200) {
      setIsLoading(false);
      setStatus(200);
    }

    if(response.status !== 200){
      setIsLoading(false);
      setStatus(400);
    }

    return response.status;
  }; 




  return {uploadFlatPhoto, status, isLoading};
};


