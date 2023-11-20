import React, { useState  } from 'react';
import { TextField, Alert, Button } from '@mui/material';
import { useResetPassword } from '../../../hooks/forgotPassword/useResetPassword';

function ResetPasswordForm({token}){
  const[password, setPassword] = useState('');
  const[repeatPassword, setRepeatPassword] = useState('');
  const { status, resetPassword, isLoading } =  useResetPassword(); 

  const handleClick = (e) => {
    e.preventDefault();
    if(password === repeatPassword){
      resetPassword(token, password);
    }
    
  };


  return(
    <>
      <form>
        <TextField
          sx= {{ mt:1 }}
          type="password"
          label = "Hasło"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"  fullWidth autoComplete="current-password" name="password" id="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)}
          required />


        <TextField
          sx= {{ mt:1 }}
          variant="filled"
          type="password"
          label = "Powtórz hasło"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth name="repeatpassword" id="repeatpassword" placeholder="Powtórz hasło" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
      
        <Button fullWidth sx={{ mt: 3, mb: 2 }} variant="contained" type="submit" onClick={handleClick} disabled={isLoading}>Zresetuj hasło</Button>
          
        {status === 200 ? <Alert variant="filled" severity="success">Hasło zresetowano pomyślnie</Alert>  : <></>}
        {status === 404 ? <Alert variant="filled" severity="error">Wystąpił błąd</Alert>  : <></>}
      </form>
    </>
  );
}


export default ResetPasswordForm;