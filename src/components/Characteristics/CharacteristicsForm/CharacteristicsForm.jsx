import React, {useEffect, useState} from 'react';
import styles from './CharacteristicsForm.module.scss';
import { useSaveCharacteristics } from '../../../hooks/characteristics/useSaveCharacteristics';
import { Alert, Box, Tabs, Tab, Typography, FormControl, InputLabel, Select, MenuItem, Slider, FormControlLabel, Checkbox, Stack, Button, Grid, Container, TextField, Fab } from '@mui/material';
import PropTypes from 'prop-types';
import { CloudUpload } from '@mui/icons-material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{width: '100%'}}
      {...other}
      
    >
      {value === index && (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


function CharacteristicsForm({charList}){
  const { saveCharacteristics, status, isLoading } = useSaveCharacteristics();
  const[sleepTime, setSleepTime] = useState(charList['sleepTime'] ? charList['sleepTime'] : 3);
  const[cooking, setCooking] = useState(charList['cooking'] ? charList['cooking'] : 3);
  const[invitingFriends, setInvitingFriends] = useState(charList['invitingFriends'] ? charList['invitingFriends'] : 3);
  const[timeSpentOutsideHome, setTimeSpentOutsideHome] = useState(charList['timeSpentOutsideHome'] ? charList['timeSpentOutsideHome'] : 3);
  const[characterType, setCharacterType] = useState(charList['characterType'] ? charList['characterType'] : 3);
  const[talkativity, setTalkativity] = useState(charList['talkative'] ? charList['talkative'] : 3);
  const[conciliatory, setConciliatory] = useState(charList['conciliatory'] ? charList['conciliatory'] : 3);
  const[likesPets, setLikesPets] = useState(charList['likesPets'] ? charList['likesPets'] : 3);
  const[hasPets, setHasPets] = useState(charList['hasPets'] ? charList['hasPets'] : -1);
  const[smokes, setSmokes] = useState(charList['smokes'] ? charList['smokes'] : 3);
  const[drinks, setDrinks] = useState(charList['drinksAlcohol'] ? charList['drinksAlcohol'] : 3);
  const[isStudent, setIsStudent] = useState(charList['isStudent'] ? charList['isStudent'] : -1);
  const[works, setWorks] = useState(charList['works'] ? charList['works'] : -1);
  const[acceptsPets, setAcceptsPets] = useState(charList['acceptsPets'] ? charList['acceptsPets'] : -1);
  const[acceptsSmoking, setAcceptsSmoking] = useState(charList['acceptsSmoking'] ? charList['acceptsSmoking'] : -1);
  const[preferedGender, setPreferedGender] = useState(charList['preferedGender'] ? charList['preferedGender'] : 'O');
  const[livesIn, setLivesIn] = useState(charList['livesIn'] ? charList['livesIn'] : -1); 


  //Flat characteristics
  const[hasFlat, setHasFlat] = useState('N');
  const[lookingForWho, setLookingforWho] =  useState(1);
  const[amountOfRooms, setAmountOfRooms] = useState(1);
  const[amountOfRoommates, setAmountOfRoommates] = useState(1);
  const[photos, setPhotos] =  useState([]);


  //What flat am I looking for?

  const[roomType, setRoomType] = useState(2);
  const[peopleInFlat, setPeopleInFlat] = useState(1);


  // Map state
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 53.02373973616983, lng: 18.610234106684413 });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });



  function handleMapClick(event) {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    console.log(event.latLng.lat(), event.latLng.lng());
  }
  
  const userId = JSON.parse(window.localStorage.getItem('userInfo'))['userId'];
  const token  = JSON.parse(window.localStorage.getItem('user'))['token'];


  const handleSubmit = async(event) =>{
    event.preventDefault();
    saveCharacteristics({acceptsPets, acceptsSmoking, characterType, conciliatory, cooking, drinks, hasPets, invitingFriends, isStudent, likesPets, preferedGender, sleepTime, smokes, talkativity, timeSpentOutsideHome, works, token, userId, livesIn});
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return(
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start', 
      width: '100%',
      mb: '2rem'
      
    }} onSubmit={handleSubmit}   className={styles.form}  component="form"  >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3, width:'100%', display: 'flex', justifyContent: 'center'}}>
        <Tabs value={value} onChange={handleChange} aria-label="panele">
          <Tab label="Informacje o sobie"  />
          <Tab label="Preferencje"  />
          <Tab label="Mieszkanie" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <span className={styles.selectWrapper}>
        Szukam współlokatora w
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, fontFamily: 'Roboto, sans-serif' }}>
            <InputLabel id="demo-simple-select-filled-label">Miasto</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={livesIn}
              defaultValue={'Gdańsk'}
              onChange={(e) => {setLivesIn(e.target.value);} }
              required
            >
              <MenuItem value={'Gdańsk'}>Gdańsk</MenuItem>
              <MenuItem value={'Toruń'}>Toruń</MenuItem>
              <MenuItem value={'Warszawa'}>Warszawa</MenuItem>
            </Select>
          </FormControl>
        </span>

        <Slider
          aria-label="Typ charakteru"
          value={characterType}
          defaultValue={characterType}
          valueLabelDisplay="auto"
          marks={[{value:1, label:'Introwertyk'}, {value:5, label:'Ekstrawertyk'}]}        
          min={1}
          max={5}
          step={1}
          sx={{mt: 2, width: '70%'}}
          onChange={(e, val) => {setCharacterType(val);}}
        />

        <Slider
          aria-label="Tryb snu"
          defaultValue={sleepTime}
          value={sleepTime}
          valueLabelDisplay="auto"
          step={1}
          marks={[{value:1, label:'Chodzę spać wcześnie'}, {value:5, label:'Chodzę spać późno'}]}        
          min={1}
          max={5}
          sx={{mt: 2, width: '70%'}}
          onChange={(e, val) => {setSleepTime(val);}} 
        />

        <Slider
          aria-label="Ugodowość"
          defaultValue={conciliatory}
          value={conciliatory}
          valueLabelDisplay="auto"
          step={1}
          marks={[{value:1, label:'Nie jestem osobą ugodową'}, {value:5, label:'Jestem osobą ugodową'}]}        
          min={1}
          max={5}
          sx={{mt: 2, width: '70%'}}
          onChange={(e, val) => {setConciliatory(val);}} 
        />

        <Slider
          aria-label="Gotowanie"
          defaultValue={cooking}
          value={cooking}
          valueLabelDisplay="auto"
          step={1}
          marks={[{value:1, label:'Rzadko gotuję'}, {value:5, label:'Często gotuje'}]}        
          min={1}
          max={5}
          sx={{mt: 2, width: '70%'}}
          onChange={(e, val) => {setCooking(val);}}
        />

        <Slider
          aria-label="Zapraszanie znajomych"
          defaultValue={invitingFriends}
          value={invitingFriends}
          valueLabelDisplay="auto"
          step={1}
          marks={[{value:1, label:'Rzadko zapraszam znajomych'}, {value:5, label:'Często zapraszam znajomych'}]}        
          min={1}
          max={5}
          sx={{mt: 2, width: '70%'}}
          onChange={(e, val) => {setInvitingFriends(val);}}
        />

        <Slider
          aria-label="Gadalitowść"
          defaultValue={3}
          value={talkativity}
          valueLabelDisplay="auto"
          step={1}
          marks={[{value:1, label:'Nie jestem osoba rozmowną'}, {value:5, label:'Jestem osobą rozmowną'}]}        
          min={1}
          max={5}
          sx={{mt: 2, width: '70%'}}
          onChange={(e, val) => {setTalkativity(val);}}     
        />

        <Slider
          classes={{ markLabel: `${styles.MuiSlider}` }}
          aria-label="Czas spędzony poza domem"
          defaultValue={timeSpentOutsideHome}
          value={timeSpentOutsideHome}
          valueLabelDisplay="auto"
          step={1}
          marks={[{value:1, label:'Rzadko wychodze z mieszkania'}, {value:5, label:'Często wychodzę z mieszkania'}]}        
          min={1}
          max={5}
          sx={{mt: 2, marginBottom: 5, width: '70%'}}
          onChange={(e, val) => {setTimeSpentOutsideHome(val);}}  
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 0,}}>
          <Grid item  xs={4}>
            <FormControlLabel control={<Checkbox onChange={(e) => {if(e.target.checked) setIsStudent(1); else setIsStudent(0);}} />} label="Jestem studentem" />
          </Grid>
          <Grid item  xs={4}>
            <FormControlLabel control={<Checkbox onChange={(e) => {if(e.target.checked) setWorks(1); else setWorks(0);}} />} label="Pracuję" />
          </Grid>
          <Grid item  xs={4}>
            <FormControlLabel control={<Checkbox onChange={(e) => {if(e.target.checked) setSmokes(1); else setSmokes(0);}} />} label="Pale  papierosy" />
          </Grid> 
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox onChange={(e) => {if(e.target.checked) setDrinks(1); else setDrinks(0);}} />} label="Piję alkohol" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox onChange={(e) => {if(e.target.checked) setHasPets(1); else setHasPets(0);}} />} label="Mam zwierzęta" />
          </Grid>
        </Grid>
      </TabPanel>
          
      <TabPanel value={value} index={1}>
        <Stack spacing={2}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 300, fontFamily: 'Roboto, sans-serif' }}>
            <InputLabel id="flat">Preferowana płeć współłlokatora</InputLabel>
            <Select
              labelId="flat"
              id="flat-filled"
              value={preferedGender}
              defaultValue={'O'}
              onChange={(e) => {setPreferedGender(e.target.value);} }
              required
            >
              <MenuItem value={'M'}>Mężczyzna</MenuItem>
              <MenuItem value={'K'}>Kobieta</MenuItem>
              <MenuItem value={'O'}>Obojętnie</MenuItem>
            </Select>
          </FormControl>


          <FormControlLabel control={<Checkbox onChange={(e) => {if(e.target.checked) setAcceptsPets(1); else setAcceptsPets(0);}} />} label="Akceptuje zwierzęta w mieszkaniu" />
          <FormControlLabel control={<Checkbox onChange={(e) => {if(e.target.checked) setAcceptsSmoking(1); else setAcceptsSmoking(0);}} />} label="Akceptuje palenie papierosów" />
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Stack spacing={2} sx={{width: '90%'}}>
          <FormControl variant="standard" sx={{ mt: 1, minWidth: 310, fontFamily: 'Roboto, sans-serif' }}>
            <InputLabel id="looking-for">Mam mieszkanie</InputLabel>
            <Select
              labelId="roommate-gender"
              id="looking-for-filled"
              defaultValue={'N'}
              value={hasFlat}
              onChange={(e) => {setHasFlat(e.target.value);}}
            >
              <MenuItem value={'T'}>Tak</MenuItem>
              <MenuItem value={'N'}>Nie</MenuItem>
            </Select>
          </FormControl>

          { hasFlat === 'T' && <>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 310, fontFamily: 'Roboto, sans-serif' }}>
              <InputLabel id="looking-for">Kogo szukam</InputLabel>
              <Select
                labelId="roommate-gender"
                id="looking-for-filled"
                defaultValue={'1'}
                onChange={(e) => {setRoomType(e.target.value);}}
                value={lookingForWho}
              >
                <MenuItem value={'1'}>Współlokatora do współdzielonego pokoju</MenuItem>
                <MenuItem value={'2'}>Współlokatora to oddzielnego pokoju</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 310, fontFamily: 'Roboto, sans-serif' }}>
              <InputLabel id="amount-of-roommates">Aktualna ilość osób w mieszkaniu</InputLabel>
              <Select
                labelId="amount-of-roommates"
                id="amount-of-roommates-filled"
                defaultValue={'1'}
                onChange={(e) => {setAmountOfRoommates(e.target.value);}}
                value={amountOfRoommates}
              >
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'3'}>3</MenuItem>
                <MenuItem value={'4'}>4</MenuItem>
                <MenuItem value={'5'}>5+</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 310, fontFamily: 'Roboto, sans-serif' }}>
              <InputLabel id="amount-of-rooms">Ilość pokoi w mieszkaniu</InputLabel>
              <Select
                labelId="amount-of-rooms"
                id="amount-of-rooms-filled"
                defaultValue={'1'}
                onChange={(e) => {setAmountOfRooms(e.target.value);}}
                value={amountOfRooms}
              >
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'3'}>3</MenuItem>
                <MenuItem value={'4'}>4</MenuItem>
                <MenuItem value={'5'}>5+</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="opis-mieszkania-static"
              label="Opis mieszkania"
              multiline
              rows={5}
              placeholder='Opisz mieszkanie'
              variant="standard"
            />

            
            <FormControlLabel
          
              control={<input id="file-input" type="file" style={{ display: 'none' }} multiple />}
              label={
                <>
                Dodaj zdjęcia mieszkania
                  <Button variant="contained" component="span" sx={{ml: 2}} startIcon={<CloudUpload />} />
                </>
              }
              labelPlacement="end"
              htmlFor="file-input"
            />

            {isLoaded &&  <> 
              Pokaż na mapie
              <GoogleMap
                onLoad={setMap}
                onClick={handleMapClick}
                center={center}
                zoom={11}
       
                mapContainerClassName='map-container'
              >
                {marker && <Marker position={marker} />}

                
              </GoogleMap>
            </>}

        
          </>
          }

          {
            hasFlat === 'N' && 
            <>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 300, fontFamily: 'Roboto, sans-serif' }}>
                <InputLabel id="room-type">Czego szukam</InputLabel>
                <Select
                  labelId="room-type"
                  id="room-type-filled"
                  defaultValue={'2'}
                  value={roomType}
                  onChange={(e) => {setRoomType(e.target.value);}}
                >
                  <MenuItem value={'1'}>Współdzielony pokój</MenuItem>
                  <MenuItem value={'2'}>Oddzielny pokój</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 310, fontFamily: 'Roboto, sans-serif' }}>
                <InputLabel id="room-type">Ilośc współlokatorów w mieszkaniu</InputLabel>
                <Select
                  labelId="people-in-flat"
                  id="people-in-flat-filled"
                  defaultValue={'1'}
                  onChange={(e) => {setPeopleInFlat(e.target.value);}}
                  value={peopleInFlat}
                >
                  <MenuItem value={'1'}>1</MenuItem>
                  <MenuItem value={'2'}>2</MenuItem>
                  <MenuItem value={'3'}>3</MenuItem>
                  <MenuItem value={'4'}>4</MenuItem>
                  <MenuItem value={'5'}>5+</MenuItem>
                </Select>

              </FormControl>
            
            </>
          }
        </Stack>

      </TabPanel>

      <Button fullWidth sx={{ mt: 3, mb: 2, width: '50%' }} variant="contained" disabled={isLoading} type="submit">ZAPISZ</Button>
      {status === 200 ? <Alert variant="filled" sx={{m:1}} severity="success">Cechy zostaly zapisane</Alert>  : <></>}
      {status === 400 ? <Alert variant="filled" sx={{m:1}} severity="error">Spróbuj ponownie później
      </Alert>  : <></>}
    </Box>
  );
}

export default CharacteristicsForm;

