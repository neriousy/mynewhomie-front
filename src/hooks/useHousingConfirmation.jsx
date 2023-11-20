import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useHousingConfirmation = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [status, setStatus] = useState(null);
  const { user } = useAuthContext();

  const askForConfirmation = async(id) => {
    setIsLoading(true);
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/housingConfirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      credentials: 'include',
      body: JSON.stringify({
        userId: id
      })
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


  return { askForConfirmation,  status, isLoading, error };
}; 