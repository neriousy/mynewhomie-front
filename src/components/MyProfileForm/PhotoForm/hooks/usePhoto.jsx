import { useEffect, useState } from 'react';
import temp from '../../../../assets/img/temp-profile.png';
import { useAuthContext } from '../../../../hooks/useAuthContext';
export const usePhoto = () => {
  const { user } = useAuthContext();
  const [blobUrl, setBlobUrl] = useState(temp);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  let userId;
  let token;


  const uploadPhoto = async (photo) =>{
    let formData = new FormData();

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

    formData.append('image', photo);
    formData.append('id', userId);
    
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/upload', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token},
      body:formData,
      credentials: 'include'
    });

    if(response.status === 200) {
      setIsLoading(false);
      setStatus(200);
      window.sessionStorage.removeItem('profilePicture');
    }

    if(response.status !== 200){
      setIsLoading(false);
      setStatus(400);
    }
  }; 

  const deletePhoto = async () => {
    try{
      userId = JSON.parse(window.localStorage.getItem('userInfo'))['userId'];
      token  = JSON.parse(window.localStorage.getItem('user'))['token'];
    }catch{
      setStatus(400);
      setIsLoading(false);
      return;
    }

    const data = await fetch(process.env.REACT_APP_API_URL + `/api/v1/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token},
      credentials: 'include'
    });

    if(data.status == 204){
      sessionStorage.removeItem('profilePicture');
      setBlobUrl(temp); // set in state
      setStatus(204);
      return;
    }else{
      setStatus(400);
    }
    return;
  };

  const setTemp = () =>{
    setBlobUrl(temp);
  };

  useEffect(() => {
    try{
      userId = JSON.parse(window.localStorage.getItem('userInfo'))['userId'];
      token  = JSON.parse(window.localStorage.getItem('user'))['token'];
    }catch{
      return;
    }
  }, []); // only execure if imageUrl changes

  return {blobUrl, uploadPhoto, status, isLoading, deletePhoto, setTemp};
};


