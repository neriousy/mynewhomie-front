import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Alert } from '@mui/material';
import styles from './EmailConfirm.module.scss';


function EmailConfirm(){
  let nav = useNavigate();

  const[isLoading, setIsLoading] = useState(true); 
  const[status, setStatus] = useState(200);

  let token = (new URLSearchParams(window.location.search)).get('token');

  const confirmEmail = async() => {

    setIsLoading(true);
    const response = await fetch(process.env.REACT_APP_API_URL + `/api/v1/auth/confirm?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });


    if(response.status == 200){
      setStatus(200);
      setIsLoading(false);
      return;
    }else{
      setStatus(500);
      setIsLoading(false);
      return;
    }
  };



  useEffect(() => {
    if(!token){
      nav('/');
    }
    confirmEmail();
  }, []);

  return(
    <main className={styles.main}>
      {isLoading == true && <CircularProgress/>}
      {(!isLoading && status == 200) && <Alert variant="filled" severity="success">Pomyślnie aktywowano konto</Alert>}
      {(!isLoading && status == 500) && <Alert variant="filled" severity="error">Wystąpił błąd lub email jest już aktywny</Alert>}

    </main>
  );
}

export default EmailConfirm;