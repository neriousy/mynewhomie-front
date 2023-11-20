import React, {useState, useEffect} from 'react';
import styles from './LoginForm.module.scss';
import { useLogin } from '../../../hooks/auth/useLogin';
import { Button, TextField, Alert, Container, Box, Typography } from '@mui/material';

function LoginForm({setType, closeModal}){
  const[loginData, setLoginData] = useState('');
  const[passwordData, setPasswordData] = useState('');
  const {login, error, isLoading, status} = useLogin();


  const handleSubmit = async(event) =>{
    event.preventDefault();

    await login(loginData, passwordData);

  };

  useEffect(() => {

    if(status === 200){
      closeModal();
    }
  }, [status]);


  return(
    
    <form className={styles.form} onSubmit={handleSubmit} method="POST">
      
      <Container>
        <Typography component="h6" sx={{fontWeight: '500', fontSize: '1.6rem', lineHeight: '160%', letterSpacing: '0.15px', color: 'rgba(0, 0, 0 , 0.87)'}}>Logowanie</Typography>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flexStart',
          }}>
          <TextField label="Email" id="email" sx={{width: '100%'}} value={loginData} required onChange={(e) => setLoginData(e.target.value)} />
          <TextField type='password'  sx={{width: '100%', mt: 2}} id="password" label="Hasło" value={passwordData} required onChange={(e) => setPasswordData(e.target.value)} />

          <Typography onClick={() => {setType('forgot');}}
            component="span" sx={{my: 3, fontSize: '1rem', color: '#1976D2', fontWeight: '500', cursor: 'pointer',width: '33%', p:0.3, textAlign: 'left',  fontStyle: 'normal', ':hover':{
              textDecoration: 'underline',
            }}}>Nie pamiętam hasła</Typography>
          <Button fullWidth sx={{ mt: 1, mb: 2 }}variant="contained" type="submit" disabled={isLoading}>Zaloguj</Button>
          {status !== 200 && status !== null ? <Alert variant="filled" severity="error">{error}</Alert>  : <></>}
        </Box>
      </Container>
    </form>
  );
}

export default LoginForm;