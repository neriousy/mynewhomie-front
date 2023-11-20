import React, {useState} from 'react';
import styles from './MyProfilev2.module.scss';
import { Alert, Avatar, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField } from '@mui/material';
import ProfilePicture from './ProfilePicture/ProfilePicture';
import { saveUserInfo } from '../../hooks/useUserInfo';
import { useEffect } from 'react';
import { CheckBox } from '@mui/icons-material';
import { useAuthContext } from '../../hooks/useAuthContext';

function MyProfilev2() {
  const { userData } = useAuthContext();
  const data = JSON.parse(localStorage.getItem('userInfo'));
  const[firstname, setFirstname] = useState('');
  const[lastname, setLastname] = useState('');
  const[username, setEmail] = useState('');
  const[age, setAge] = useState('');
  const[gender, setGender] = useState('O');
  const[phonenumber, setPhonenumber] = useState('');
  const[status, setStatus] = useState(0);
  const[description, setDescription] = useState('');
  const[still_looking, setStill_looking] = useState(true);
  const { dispatchAuth }  = useAuthContext();

  useEffect(() =>{
    setFirstname(userData.firstname);
    setLastname(userData.lastname);
    setEmail(userData.username);
    setAge(userData.age);
    setGender(userData.gender);
    setPhonenumber(userData.phonenumber);
    setDescription(userData.description);
    setStill_looking(userData.still_looking);

  }, []);

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log({firstname, lastname, username, age, gender, phonenumber});
    const respStatus = await saveUserInfo({firstname, lastname, username, age, gender, phonenumber, description, still_looking});
    setStatus(respStatus);
    if(respStatus === 200){
      dispatchAuth({type: 'SET-DATA', payload:{firstname, lastname, username, age, gender, phonenumber, description, still_looking}});
    }
  };



  return(
    <main className={styles.main}>
      <h4>
        Mój profil
      </h4>

      <Divider sx={{marginTop: '1rem', marginBottom: '3rem'}}/>

      <Box component="form" onSubmit={handleSubmit} sx={{width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column',
        '@media (max-width: 768px)': {
          width: '100%',
        }
      
      }}>
        <ProfilePicture/>

        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <TextField label="Imię" value={firstname} onChange={(e) => setFirstname(e.target.value)} sx={{width: '48%'}} />
            <TextField label="Nazwisko" value={lastname} onChange={(e) => setLastname(e.target.value)} sx={{width: '48%'}} />
          </Box>
          <TextField label="Email" value={username} onChange={(e) => setEmail(e.target.value)}  sx={{width: '100%', my: 2}} />

          <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <TextField type='number' label="Wiek" value={age} onChange={(e) => setAge(parseInt(e.target.value))} sx={{width: '48%'}} />
            <FormControl sx={{width:  '48%'}}>
              <InputLabel id="demo-simple-select-label">Płeć</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Płeć"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value={'M'}>Mężczyzna</MenuItem>
                <MenuItem value={'K'}>Kobieta</MenuItem>
                <MenuItem value={'O'}>Inna</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl sx={{width: '100%', my: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <TextField label="Numer telefonu" value={phonenumber} sx={{width: '48%'}} onChange={(e) => setPhonenumber(e.target.value)}  />
            <FormControlLabel sx={{width: '47%'}} control={<Checkbox checked={still_looking} onChange={(e => setStill_looking(e.target.checked ? true : false))}/>} label="Uwzględniaj mnie w wyszukiwarce" />
          </FormControl>
          <TextField
            id="opisz-siebie"
            label="Opisz się"
            multiline
            rows={5}
            placeholder='Twój opis'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{width: '100%', mt: 1}}
          />
        </Box>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', mt: 2}}>
          <Button variant="outlined" sx={{width: '47%'}}>Anuluj</Button>
          <Button sx={{width: '47%'}} variant="contained" type="submit">Zapisz</Button>
        </Box>
        {status === 200 ? <Alert variant="filled" sx={{mt: 2, width: '100%'}} severity="success">Dane zostały poprawnie zapisane</Alert>  : <></>}
        {status !== 0 && status !== 200 ? <Alert variant="filled" sx={{mt: 2, width: '100%'}} severity="error">Coś poszło nie tak. Spróbuj ponownie później</Alert>  : <></>}
      </Box>


    </main>

  );
}

export default MyProfilev2;

