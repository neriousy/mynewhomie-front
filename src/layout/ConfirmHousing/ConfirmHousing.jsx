import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Alert } from '@mui/material';
import styles from './ConfirmHousing.module.scss';


function ConfirmHousing(){
  let nav = useNavigate();

  const[isLoading, setIsLoading] = useState(true); 
  const[status, setStatus] = useState(200);

  let token = (new URLSearchParams(window.location.search)).get('token');

  const sendConfirmation = async() => {

    setIsLoading(true);
    const response = await fetch(process.env.REACT_APP_API_URL + `/api/v1/housingConfirmation/confirm?token=${token}`, {
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
    sendConfirmation();
  }, []);

  return(
    <main className={styles.main}>
      {isLoading == true && <CircularProgress/>}
      {(!isLoading && status == 200) && <Alert variant="filled" severity="success">Potwierdzono wspólne zamieszkanie</Alert>}
      {(!isLoading && status == 500) && <Alert variant="filled" severity="error">Wystąpił błąd lub potwierdzono wspólne zamieszkanie wcześniej</Alert>}

    </main>
  );
}

export default ConfirmHousing;