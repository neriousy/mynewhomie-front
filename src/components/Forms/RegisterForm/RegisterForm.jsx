import React, { useEffect, useState, useRef } from 'react';
import { useSignUp } from '../../../hooks/auth/useSignUp';
import Avatar from '@mui/material/Avatar';
import { Alert, Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

function RegisterForm({setType}) {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatpassword] = useState('');
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState('M');
  const [phonenumber, setPhonenumber] = useState('');


  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatError, setRepeatError] = useState('');
  const [phonenumberError, setPhonenumberError] = useState('');

  const { signUp, error, status, isLoading } = useSignUp();

  const [accepted, setAccepted] = useState(false);
  const acceptRef = useRef(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submit');
    // console.log(firstname);
    // console.log(lastname);
    // console.log(email);
    // console.log(password);
    // console.log(repeatpassword);
    // console.log(age);
    // console.log(gender);
    // console.log(phonenumber);

    if (!validateEmail(email)) {
      console.log('niepoprawny email');
      setEmailError('Wprowadź poprawny adres email');
      return;
    } else {
      setEmailError('');
    }
    if (!validatePassword(password)) {
      console.log('niepoprawne hasło');
      setPasswordError('Hasło musi zawierać co najmniej 8 znaków, jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny');
      return;
    } else {
      setPasswordError('');
    }
    if (!validateRepeat(repeatpassword)) {
      console.log('niepoprawne hasło');
      setRepeatError('Hasło nie pasuje do powyższego');
      return;
    } else {
      setRepeatError('');
    }
    if (!validatePhone(phonenumber)) {
      console.log('niepoprawny numer telefonu (poprawny numer telefonu zawiera 9 cyfr)');
      setPhonenumberError('Niepoprawny numer telefonu (poprawny numer telefonu zawiera 9 cyfr)');
      return;
    } else {
      setPhonenumberError('');
    }

    if(!accepted){
      console.log('nie zaakceptowano regulaminu');
      acceptRef.current.style.color = '#ff0000';  
      return;
    }


    await sendValues();
  };


  const prevalidateName = (e) => {
    const re = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setFirstname(e.target.value);
    }
  };

  const prevalidateLastname = (e) => {
    const re = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setLastname(e.target.value);
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9.! #$%&'*+-/=? ^_`{|}~]*@[a-zA-Z.0-9-]*\.[a-zA-Z]{2,}$/;
    if (re.test(email)) {
      return true;
    }
    return false;
  };

  const validatePhone = (phone) => {
    const re = /^[1-9]{1}[0-9]{8}$/;
    if (re.test(phone)) {
      return true;
    }
    return false;
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (re.test(password)) {
      return true;
    }
    return false;
  };
  const validateRepeat = (e) => {
    if (password == repeatpassword) {
      return true;
    }
    return false;
  };

  const prevalidateAge = (e) => {
    const re = /^[1-9][0-9]*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setAge(e.target.value);
    }
  };

  const prevalidatePhone = (e) => {
    const re = /^[0-9]{0,9}$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPhonenumber(e.target.value);
    }
  };

  const sendValues = async () => {
    await signUp(firstname, lastname, email, password, age, gender, phonenumber);
  };




  return (
    <ThemeProvider theme={theme}>

      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Box component="form"
            onSubmit={handleSubmit}>
            <Box sx={{width: '100%',  display:'flex', justifyContent: 'space-between'}}>
              <Typography component="h6" sx={{fontWeight: '500', fontSize: '1.6rem', lineHeight: '160%', letterSpacing: '0.15px', color: 'rgba(0, 0, 0 , 0.87)', mt: '1rem', mb: '1.5rem'}}>Rejestracja</Typography>
              <Typography onClick={() => {setType('login');}}
                component="span" sx={{my: 3, fontSize: '1rem', color: '#1976D2', fontWeight: '500', cursor: 'pointer', p:0.3, textAlign: 'right',  fontStyle: 'normal', ':hover':{
                  textDecoration: 'underline',
                }}}>Logowanie</Typography>
            </Box>
            <Box sx={{width: '100%',  display:'flex', justifyContent: 'space-between'}}>
              <TextField type="text" sx= {{ mt: 1, width: '48%' }} label = "Imię"
                name="firstname" id="firstname" placeholder="Imię" value={firstname} onChange={prevalidateName} required />

              <TextField type="text" sx= {{ mt: 1, width: '48%'}} name="lastname" id="lastname" placeholder="Nazwisko" value={lastname} onChange={prevalidateLastname} required />
            </Box>
            <TextField 
              label = "Email"
              sx={{ my: '1rem' }}
              type="text"  fullWidth name="email" id="email" placeholder="Adres e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <span>{emailError}</span>


            <TextField
              sx= {{ my: '1rem' }}
              type="password"
              label = "Hasło"
              fullWidth autoComplete="current-password" name="password" id="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)}
              required />
            <span>{passwordError}</span>


            <TextField
              sx= {{ my: '1rem' }}
              type="password"
              label = "Powtórz hasło"
              fullWidth
              name="repeatpassword" id="repeatpassword" placeholder="Powtórz hasło" value={repeatpassword} onChange={(e) => setRepeatpassword(e.target.value)} required />
            <span>{repeatError}</span>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <TextField
                sx= {{my: '1rem', width: '48%' }}
                type="number"
                label="Wiek"
                name="age"
                id="age"
                placeholder="wiek"
                value={age}
                onChange={prevalidateAge}
                required />

              <Select
                sx= {{ my: '1rem', width: '48%'}}
                value={gender}
                label = "Płeć"
                onChange={(e) => setGender(e.target.value)}
                required>
                <MenuItem value="M">Mężczyzna</MenuItem>
                <MenuItem value="K">Kobieta</MenuItem>
                <MenuItem value="O">Wolę nie podawać</MenuItem>
              </Select>

            </Box>


            <TextField type="text" label = "Numer telefonu"
              fullWidth
              sx= {{ my: '1rem' }}
              name="phonenumber" id="phonenumber" placeholder="Numer telefonu" value={phonenumber} onChange={prevalidatePhone} required />
            <span>{phonenumberError}</span>

            <FormControlLabel control={<Checkbox onChange={(e) => setAccepted(e.target.checked)} />} ref={acceptRef}  label="Zgadzam się na przetwarzanie moich danych osobowych" />
            


            <Button fullWidth sx={{ mt: 3, mb: '3rem' }} variant="contained" disabled={isLoading} type="submit">Zarejestruj</Button>

            {status === 201 ? <Alert variant="filled" severity="success">Zarejestrowanie powiodło się. Potwierdź swój adres email</Alert>  : <></>}
            {status === 226 ? <Alert variant="filled" severity="error">Email jest zajęty</Alert>  : <></>}
            {status === 500 ? <Alert variant="filled" severity="error">{error}</Alert>  : <></>}
            
          </Box>

        </Box>
        
      </Container>
      
    </ThemeProvider>
  );

}

export default RegisterForm;