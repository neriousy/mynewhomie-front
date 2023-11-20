import { useEffect, useState } from 'react';
import JSZip from 'jszip';

export const useUser = (id) => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  let token;

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


  const userDetails = async () => {
    setIsLoading(true);
    try{
      token  = JSON.parse(window.localStorage.getItem('user'))['token'];
    }catch{
      setStatus(400);
      setIsLoading(false);
      return;
    }

    const response = await fetch(process.env.REACT_APP_API_URL + `/api/v1/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token},
      credentials: 'include'
    });

    if(response.status === 200){
      const json = await response.json();
      setData(json);
      
      const flatPhotos = await getFlatPhotos(id, token);
      setData({...json, flatPhotos: flatPhotos});
      setIsLoading(false);
      setStatus(200);

    }

    if(response.status !== 200){
      setStatus(404);
      setIsLoading(false);
      setData(null);
    }

    


  };

  useEffect(() =>  {
    userDetails();
  }, [id]);



  return {userDetails, status, error, isLoading, data};
};

  



