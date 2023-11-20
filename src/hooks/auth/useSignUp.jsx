import { useState } from 'react';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [status, setStatus] = useState(null);

  const signUp = async (firstname, lastname, email, password, age, gender, phonenumber) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({firstname, lastname, email, password, age, gender, phonenumber}),
      credentials: 'include'
    });

    
    if(response.status !== 201 && response.status !== 226){
      setIsLoading(false);
      setStatus(500);
      setError(response.error);
    }

    if(response.status === 226) {
      setIsLoading(false);
      setStatus(226);
      setError('Email jest zajęty');
    }

    if(response.status === 201) {
      setIsLoading(false);
      setStatus(201);
    }
  }; 

  return { signUp, status, isLoading, error };
}; 