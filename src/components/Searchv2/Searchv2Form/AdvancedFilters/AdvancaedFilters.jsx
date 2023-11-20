import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { useSearch } from '../../hooks/useSearch';

function AdvancaedFilters({handleAdvancedSearch}){
  const[city, setCity] = useState('Warszawa');
  const[preferredGender, setPreferredGender] = useState('O');
  const[ageFrom, setAgeFrom] = useState(0);
  const[ageTo, setAgeTo] = useState(0);  

  const [isWorking, setIsWorking] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [isDrinking, setIsDrinking] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);
  const [hasFlat, setHasFlat] = useState(false);
  const [roomType, setRoomType] = useState(2);
  const [amountOfPeople, setAmountOfPeople] = useState(1);

  const { advancedSearch } = useSearch();

  useEffect(() => {
    console.log(hasFlat);
  }, [hasFlat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await advancedSearch({city, ageFrom, ageTo, preferredGender, isWorking, isStudying, isDrinking, isSmoking, hasFlat, roomType, amountOfPeople});
    handleAdvancedSearch(data);
  };




  return(
    <Box component="form" onSubmit={handleSubmit} sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '1.5rem',
      boxSizing: 'border-box',
      p:1
    }}> 
      
      <FormControl sx={{width: '100%' }} size="medium">
        <InputLabel id="demo-select-small-label">Miasto</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={city}
          label="Miasto"
          onChange={(e) => setCity(e.target.value)}
        >
          <MenuItem disabled value="">
            <em>Wybierz miasto</em>
          </MenuItem>
          <MenuItem value="Toruń">Toruń</MenuItem>
          <MenuItem value="Warszawa">Warszawa</MenuItem>
          <MenuItem value="Kraków">Kraków</MenuItem>
          <MenuItem value="Wrocław">Wrocław</MenuItem>
          <MenuItem value="Poznań">Poznań</MenuItem>
          <MenuItem value="Gdańsk">Gdańsk</MenuItem>
          <MenuItem value="Szczecin">Szczecin</MenuItem>
          <MenuItem value="Bydgoszcz">Bydgoszcz</MenuItem>
          <MenuItem value="Lublin">Lublin</MenuItem>
          <MenuItem value="Katowice">Katowice</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
      
        <TextField type="number" inputProps={{ min: 18, }}  label="Wiek od" onChange={(e) => setAgeFrom(parseInt(e.target.value))} sx={{width: '46%'}} />
        <TextField type="number" inputProps={{ min: 18, }}  label="Wiek do" onChange={(e) => setAgeTo(parseInt(e.target.value))} sx={{width: '46%'}} />
      </Box>

      <FormControl sx={{width: '100%'}}>
        <InputLabel id="demo-select-gender-label">Płeć</InputLabel>
        <Select
          value={preferredGender}
          onChange={(e) => setPreferredGender(e.target.value)}
          inputProps={{
            name: 'preferredGender',
            id: 'preferredGender',
          }}
          labelId="demo-select-gender-label"
          id="demo-select-small"
          label="Płeć"
          width="100%"
        >
          <MenuItem disabled value="">
            <em>Wybierz płeć</em>
          </MenuItem>
          <MenuItem value="O">Obojętnie</MenuItem>
          <MenuItem value="M">Mężczyzna</MenuItem>
          <MenuItem value="K">Kobieta</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{width: '100%'}}>
        <Typography sx={{color: '#000', fontSize: '1rem'}}>Musi mieć mieszkanie?</Typography>
        <RadioGroup
          aria-label="hasFlat"  
          value={hasFlat}
          onChange={(e) => e.target.value === 'false' ? (setHasFlat(false), setRoomType(2))  : (setHasFlat(true), setRoomType(0))}
          name="hasFlat"
          row
          sx={{display: 'flex', flexDirection: 'row', width: '100%', gap:'1rem'}}
        >
          <FormControlLabel value={false} control={<Radio />} label="Nie" />
          <FormControlLabel value={true} control={<Radio />} label="Tak" />
        </RadioGroup>
      </FormControl>

      <FormControl sx={{width: '100%'}}>
        <Typography sx={{color: '#000', fontSize: '1rem'}}>Kogo szukam?</Typography>
        <RadioGroup
          aria-label="roomType"  
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          name="roomType"
          row
          sx={{display: 'flex', flexDirection: 'row', width: '100%'}}
        >
            
          <FormControlLabel value={hasFlat ? 0 : 2} control={<Radio />} label="Współlokatora do osobnego pokoju" />
          <FormControlLabel value={hasFlat ? 1 : 3} control={<Radio />} label="Współlokatora do wspóldzielonego pokoju" />
  
          
        </RadioGroup>
      </FormControl>

      {
        hasFlat && (
          <>
            <FormControl sx={{width: '100%'}}>
              <InputLabel id="demo-select-amount-label">Ilość osób w mieszkaniu</InputLabel>
              <Select
                value={amountOfPeople}
                onChange={(e) => setAmountOfPeople(e.target.value)}
                inputProps={{
                  name: 'amountOfPeople',
                  id: 'amountOfPeople',
                }}
                labelId="demo-select-amountOfPeople-label"
                id="demo-select-small"
                label="Ilość osób w mieszkaniu"
                width="100%"
              >
                <MenuItem disabled value="">
                  <em>Wybierz opcje</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3+</MenuItem>
              </Select>
            </FormControl>
          </>
        )
      }

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',

      }}>
        <Typography sx={{mb: '.5rem'}}>
          Dodatkowe informacje
        </Typography>
      
        <FormControlLabel control={<Checkbox onChange={(e) => setIsStudying(e.target.checked)} />} label="Student" />
        <FormControlLabel control={<Checkbox onChange={(e) => setIsWorking(e.target.checked)} />} label="Pracujący" />
        <FormControlLabel control={<Checkbox onChange={(e) => setIsDrinking(!e.target.checked)} />} label="Nie pije  alkoholu" />
        <FormControlLabel control={<Checkbox onChange={(e) => setIsSmoking(!e.target.checked)} />} label="Nie pali papierosów" />
        {/* <FormControlLabel control={<Checkbox onChange={(e) => setIsSmoking(e.target.checked)} />} label="Ma mieszkanie" /> */}


    
      </Box>

      <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', mt: 'auto'}}>
        <Divider sx={{width: '100%', mb: '.5rem'}} />
        <Box sx={{display: 'flex', justifyContent: 'space-between', width:'100%'}}>
          <Button variant="outlined" sx={{width: '47%'}}>Wyczyść</Button>
          <Button sx={{width: '47%'}} variant="contained" type="submit" onClick={handleSubmit}>Szukaj</Button>
        </Box>
      </Box>
      
    </Box>
  );
}

export default AdvancaedFilters;