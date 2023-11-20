import { useState } from 'react';

export const useEmailConfirm = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [status, setStatus] = useState(null);

  const confirmEmail = async() => {
    setIsLoading(true);
    const response = await fetch(process.env.REACT_APP_API_URL + `/api/v1/auth/confirm?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if(response.ok){
      setStatus(200);
      setIsLoading(false);
      return;
    }else{
      setStatus(500);
      setIsLoading(false);
      return;
    }
  };

  return { confirmEmail, status, isLoading, error };
}; 