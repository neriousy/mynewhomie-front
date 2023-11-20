import { useState } from 'react';


export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [status, setStatus] = useState(0);

  const forgotPassword = async (email) =>{
    let formData = new FormData();

    setIsLoading(true);
    setError(null);


    formData.append('email', email);
    
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reset-password', {
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

  return { forgotPassword, isLoading, error, status };
}; 