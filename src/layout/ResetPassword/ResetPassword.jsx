import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm/ResetPasswordForm';
import styles from './ResetPassword.module.scss';


function ResetPassword(){
  let nav = useNavigate();

  let token = (new URLSearchParams(window.location.search)).get('token');


  useEffect(() => {
    if(!token){
      nav('/');
    }
  }, []);

  return(
    <main className={styles.main}>
      
      <ResetPasswordForm token={token}/>
    </main>
  );
}

export default ResetPassword;