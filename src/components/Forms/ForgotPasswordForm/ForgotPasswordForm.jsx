import React, {useState} from 'react';
import { Button, TextField, Alert, Container, Box, Typography } from '@mui/material';
import { useForgotPassword } from '../../../hooks/forgotPassword/useForgotPassword';

function ForgotPasswordForm({setType}){
  const[email, setEmail] = useState('');
  const{ forgotPassword, status, isLoading } = useForgotPassword();

  const handleClick = (event) => {
    if(email === ''){
      return;
    }
    event.preventDefault();
    forgotPassword(email);
  };

  return(
    <Box>

      <form>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mt: 2, mb: 3}}>
          <Typography component="h6" sx={{fontWeight: '500', fontSize: '1.6rem', lineHeight: '160%', letterSpacing: '0.15px', color: 'rgba(0, 0, 0 , 0.87)'}}>Znajdź swoje konto</Typography>
          
          <Typography onClick={() => {setType('login');}}
            component="span" sx={{fontSize: '1rem', color: '#1976D2', fontWeight: '500', cursor: 'pointer', p:0.3, textAlign: 'right',  fontStyle: 'normal', ':hover':{
              textDecoration: 'underline',
            }}}>Logowanie</Typography>

        </Box>
        <Typography component="h6" sx={{fontWeight: '400', fontSize: '1.2rem', lineHeight: '160%', letterSpacing: '0.15px', color: 'rgba(0, 0, 0 , 0.87)'}}>
        Wprowadź adres e-mail aby wyszukać swoje konto.
        </Typography>

        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>

          <TextField sx={{width: '100%'}} InputProps={{style: {fontSize: '1.4em'}}}  id="email" label="Email" value={email} required={true} onChange={(e) => setEmail(e.target.value)} />
          <Button fullWidth sx={{ mt: 3, mb: 2 }} variant="contained" type="submit" onClick={handleClick} disabled={isLoading}>Zresetuj hasło</Button>
          
          {status !== 0 ? <Alert variant="filled" severity="success">Jeśli taki użytkownik istnieje została wysłana wiadomość email z linkiem do restowania hasła</Alert>  : <></>}
        </Box>
      </form>
    </Box>
  );
}

export default ForgotPasswordForm;