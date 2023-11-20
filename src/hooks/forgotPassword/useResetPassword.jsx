import { useState } from 'react';


export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [status, setStatus] = useState(null);

  const resetPassword = async (token, password) =>{
    let formData = new FormData();
    

    setIsLoading(true);
    setError(null);


    formData.append('token', token);
    formData.append('password', password);
    
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reset-password-form', {
      method: 'POST',
      body:formData,
      credentials: 'include'
    });

    if(response.status === 200) {
      setIsLoading(false);
      setStatus(200);
    }

    if(response.status !== 200){
      setIsLoading(false);
      setStatus(404);
    }
  }; 

  return { resetPassword, isLoading, error, status };
}; 