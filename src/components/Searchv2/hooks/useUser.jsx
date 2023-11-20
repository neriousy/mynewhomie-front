import { useEffect, useState } from 'react';

export const useUser = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [userData, setuserData] = useState(null);
  let token;

  const userDetails = async (id) => {
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
      setIsLoading(false);
      setStatus(200);
      const json = await response.json();
      setuserData(json);
      return json;

    }

    if(response.status !== 200){
      setStatus(404);
      setIsLoading(false);
      setuserData(null);
    }
  };

  return {userDetails, status, error, isLoading, userData};
};

  



