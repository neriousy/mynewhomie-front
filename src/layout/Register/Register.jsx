import React from 'react';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import styles from './Register.module.scss';
function Register(){
  return(
    <>
      <main className={styles.main}>
        <RegisterForm/>
      </main>
    </>
  );
}

export default Register;