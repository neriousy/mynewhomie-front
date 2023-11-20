import React, {useState, useRef, useEffect} from 'react';
import styles from './Characteristicsv2.module.scss';
import { Box, Tabs, Tab, Typography, FormControlLabel, Checkbox, Button, Select, Radio, FormControl, FormLabel, RadioGroup, Divider, Alert, InputLabel, MenuItem, TextField, ImageList, ImageListItem } from '@mui/material';
import PropTypes from 'prop-types';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import CharSlider from './CharSlider/CharSlider';
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { CloudUpload } from '@mui/icons-material';
import { useSaveCharacteristics } from '../../hooks/characteristics/useSaveCharacteristics';
import { useFlatPhoto } from '../../hooks/useFlatPhoto';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { useAuthContext } from '../../hooks/useAuthContext';

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
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flexStart', width: '40%',
          '@media (max-width: 768px)': {
            width: '100%',
          }

        }}>
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

const libraries = ['places'];

function Characteristicsv2(){
  const { saveCharacteristics } = useSaveCharacteristics();
  const { characteristics, dispatchAuth, flatPhotos } = useAuthContext();
  const { uploadFlatPhoto } = useFlatPhoto();
  const [status, setStatus] = useState(0);

  const userId = JSON.parse(window.localStorage.getItem('userInfo'))['userId'];
  const token  = JSON.parse(window.localStorage.getItem('user'))['token'];

  // TabState
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const tooBolean = (value) => {
    if(value === 1) return true;
    else return false;
  };
  

  // SliderState
  const [sleepTime, setSleepTime] = useState(characteristics !== false ? characteristics.sleepTime : 3);
  const [cooking, setCooking] = useState(characteristics ? characteristics.cooking : 3);
  const [invitingFriends, setInvitingFriends] = useState(characteristics ? characteristics.invitingFriends : 3);
  const [timeSpentOutsideHome, setTimeSpentOutsideHome] = useState( characteristics ? characteristics.timeSpentOutsideHome : 3); 
  const [characterType, setCharacterType] = useState(characteristics ? characteristics.characterType : 3);
  const [talkativity, setTalkativity] = useState(characteristics ? characteristics.talkativity : 3);
  const [conciliatory, setConciliatory] = useState(characteristics ? characteristics.conciliatory : 3);

  // CheckboxState
  const [hasPets, setHasPets] = useState(characteristics ? tooBolean(characteristics.hasPets) : false);
  const [smokes, setSmokes] = useState(characteristics ? tooBolean(characteristics.smokes) : false);
  const [drinks, setDrinks] = useState(characteristics ? tooBolean(characteristics.drinks) : false);
  const [isStudent, setIsStudent] = useState(characteristics ? tooBolean(characteristics.isStudent) : false);
  const [works, setworks] = useState(characteristics ? tooBolean(characteristics.works) : false);

  //Preferences

  const [acceptsPets, setAcceptsPets] = useState(characteristics ? tooBolean(characteristics.acceptsPets) : false);
  const [acceptsSmoking, setAcceptsSmoking] = useState(characteristics ? tooBolean(characteristics.acceptsSmoking) : false);
  const [preferedGender, setpreferedGender] = useState(characteristics ? tooBolean(characteristics.preferedGender) : 'O');
  const [livesIn, setlivesIn] = useState(characteristics ? characteristics.livesIn : 'Warszawa');


  //Flat
  const [hasFlat, setHasFlat] = useState(characteristics ? characteristics.hasFlat : false);
  const [searchOption, setsearchOption] = useState(characteristics ? characteristics.searchOption : 2);
  const [numberOfRooms, setnumberOfRooms] = useState(characteristics ? characteristics.numberOfRooms : 1);
  const [numberOfPeople, setnumberOfPeople] = useState(characteristics ? characteristics.numberOfPeople : 1);
  const [description, setDescription] = useState(characteristics ? characteristics.description : '');

  //Images
  const [filesToSend, setFilesToSend] = useState([]);
  const [filesToShow, setFilesToShow] = useState([]);

  
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const { files } = e.target;
    const  filesToSend = Array.from(files);
    setFilesToSend(filesToSend);
    let newFiles = Array.from(files).map((file) => URL.createObjectURL(file));
    setFilesToShow((oldFiles) => [...oldFiles, ...newFiles]);
  };


  useEffect(() => {
    let temp = [];
    if(flatPhotos !== undefined){
      flatPhotos.forEach((file) => {
        temp.push(file.url);
      }
      );}
    setFilesToShow(temp);

  }, []);




  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const onPlacesChangedRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Map state
  const [marker, setMarker] = useState(characteristics ? {
    lat: characteristics.lat,
    lng: characteristics.lng,
  } : { 
    lat: 53.02373973616983,
    lng: 18.610234106684413,
  });

  const [center, setCenter] = useState({ lat: 53.02373973616983, lng: 18.610234106684413 });
  
  function handleMapClick(event) {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    console.log(marker);
  }

  const formData={
    acceptsPets,
    acceptsSmoking,
    characterType,
    conciliatory,
    cooking,
    description,
    drinks,
    hasFlat,
    hasPets,
    invitingFriends,
    livesIn,
    isStudent,
    numberOfPeople,
    numberOfRooms,
    marker,
    preferedGender,
    searchOption,
    sleepTime,
    smokes,
    talkativity,
    timeSpentOutsideHome,
    token,
    works,
    userId,
  };

  const handleSubmit = async(event) =>{
    event.preventDefault();
    const stat = await saveCharacteristics(formData, filesToSend);
    
    if(filesToSend != [])
    {
      console.log(filesToSend);
    }
    setStatus(stat);
    if(stat === 200){
      let latitude = marker.lat;
      let longitude = marker.lng;
      dispatchAuth({type: 'SET-CHAR', payload: {    acceptsPets,
        acceptsSmoking,
        characterType,
        conciliatory,
        cooking,
        description,
        drinks,
        hasFlat,
        hasPets,
        invitingFriends,
        livesIn,
        isStudent,
        numberOfPeople,
        numberOfRooms,
        latitude,
        longitude,
        preferedGender,
        searchOption,
        sleepTime,
        smokes,
        talkativity,
        timeSpentOutsideHome,
        token,
        works,
        userId,}});

      dispatchAuth({type: 'SET-FLAT-PHOTOS', payload: filesToShow});
    }
    
  };


  useEffect(() => {
    if(characteristics !== false){
      setSleepTime(characteristics.sleepTime);
      setCooking(characteristics.cooking);
      setInvitingFriends(characteristics.invitingFriends);
      setTimeSpentOutsideHome(characteristics.timeSpentOutsideHome);
      setCharacterType(characteristics.characterType);
      setTalkativity(characteristics.talkativity);
      setConciliatory(characteristics.conciliatory);
      setHasPets(characteristics.hasPets === 1  ? true : false);
      setSmokes(characteristics.smokes === 1  ? true : false);
      setDrinks(characteristics.drinks === 1  ? true : false);
      setIsStudent(characteristics.isStudent === 1  ? true : false);
      setworks(characteristics.works === 1  ? true : false );
      setAcceptsPets(characteristics.acceptsPets === 1  ? true : false);
      setAcceptsSmoking(characteristics.acceptsSmoking  === 1  ? true : false);
      setpreferedGender(characteristics.preferedGender);
      setlivesIn(characteristics.livesIn);
      setHasFlat(characteristics.hasFlat);
      setsearchOption(characteristics === null ? 2 : characteristics.searchOption);
      setnumberOfRooms(characteristics.numberOfRooms);
      setnumberOfPeople(characteristics.numberOfPeople);
      setDescription(characteristics.description);
      setMarker({lat: characteristics.latitude,
        lng: characteristics.longitude});
      setCenter({lat: characteristics.latitude,
        lng: characteristics.longitude});
    }

    const onPlacesChanged = () => {
      const places = searchBoxRef.current.getPlaces();

      if (places.length > 0) {
        const selectedPlace = places[0];
        const selectedLocation = {
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
        };

        setCenter(selectedLocation);
      }
    };

    onPlacesChangedRef.current = onPlacesChanged;

    return () => {
      // Cleanup
      if (searchBoxRef.current) {
        window.google.maps.event.clearInstanceListeners(searchBoxRef.current);
      }
    };
  }, [characteristics]);


  
  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }


  return(
    <main className={styles.main}>
      <h4>Cechy</h4>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3, width:'100%', display: 'flex', justifyContent: 'flexStart', fontSize: '2rem'}}>
        <Tabs value={value} onChange={handleChange} aria-label="panele">
          <Tab label={<><PersonOutlineIcon/> O mnie</> } sx={{textTransform: 'none', fontWeight: 500, flexDirection: 'row'}}  />
          <Tab label={<><AutoAwesomeIcon/> Preferencje</> } sx={{textTransform: 'none', fontWeight: 500, flexDirection: 'row'}}  />
          <Tab label={<><HomeWorkOutlinedIcon/> Mieszkanie</> } sx={{textTransform: 'none', fontWeight: 500, flexDirection: 'row'}}  />
        </Tabs>
      </Box>


      <TabPanel value={value} index={0}>
        <CharSlider name="Osobowość" value={characterType} marks={['Introwertyk', 'Ekstrawertyk']} setValue={setCharacterType}/> 
        <CharSlider name="Chodzę spać" value={sleepTime} marks={['Wcześnie', 'Późno']} setValue={setSleepTime}/>
        <CharSlider name="Gdy pojawia się problem" value={conciliatory} marks={['Ugodowy', 'Konfliktowy']} setValue={setConciliatory}/>
        <CharSlider name="Gotowanie" value={cooking} marks={['Rzadko', 'Często']} setValue={setCooking}/>
        <CharSlider name="Zapraszam znajomych" value={invitingFriends} marks={['Rzadko', 'Często']} setValue={setInvitingFriends}/>
        <CharSlider name="Rozmawiam z innymi" value={talkativity} marks={['Rzadko', 'Często']} setValue={setTalkativity}/>
        <CharSlider name="Wychodzę z mieszkania" value={timeSpentOutsideHome} marks={['Rzadko', 'Często']} setValue={setTimeSpentOutsideHome}/>
      
        <Box sx={{display: 'flex', flexDirection:'column'}}>
          <Typography variant="h6" gutterBottom component="div" sx={{fontWeight: 400, mt: -1}}>
              Dodatkowe informacje
          </Typography>

          <FormControlLabel control={<Checkbox checked={isStudent} onChange={(e => (setIsStudent(e.target.checked), console.log(e.target.checked)))}/>} label="Jestem studentem" />
          <FormControlLabel control={<Checkbox checked={works} onChange={(e => setworks(e.target.checked))} />} label="Pracuję" />
          <FormControlLabel control={<Checkbox checked={smokes} onChange={(e => setSmokes(e.target.checked))} />} label="Palę papierosy" />
          <FormControlLabel control={<Checkbox checked={drinks} onChange={(e => setDrinks(e.target.checked))} />} label="Piję alkohol" />
          <FormControlLabel control={<Checkbox checked={hasPets} onChange={(e => setHasPets(e.target.checked))}/>} label="Mam zwierzęta" />
        </Box>

        
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography fontSize={'1.2rem'} sx={{mb: 2}}>
          Miasto, w którym szukam współlokatora
        </Typography>

        <Select
          native
          value={livesIn}
          onChange={(e) => setlivesIn(e.target.value)}
          inputProps={{
            name: 'livesIn',
            id: 'livesIn',
          }}
        >
          <option value="Toruń">Toruń</option>
          <option value="Warszawa">Warszawa</option>
          <option value="Kraków">Kraków</option>
          <option value="Wrocław">Wrocław</option>
          <option value="Poznań">Poznań</option>
          <option value="Gdańsk">Gdańsk</option>
          <option value="Szczecin">Szczecin</option>
          <option value="Bydgoszcz">Bydgoszcz</option>
          <option value="Lublin">Lublin</option>
          <option value="Katowice">Katowice</option>
        </Select>

        <Typography fontSize={'1.2rem'} sx={{mt: 4, mb: 2}}>
          Preferowana płeć współlokatora
        </Typography>

        <Select
          native
          value={preferedGender}
          onChange={(e) => setpreferedGender(e.target.value)}
          inputProps={{
            name: 'preferedGender',
            id: 'preferedGender',
          }}
        >
          <option value="O">Obojętnie</option>
          <option value="M">Mężczyzna</option>
          <option value="K">Kobieta</option>
        </Select>
        <Box sx={{display: 'flex', flexDirection: 'column', my: 4}}>
          <FormControlLabel control={<Checkbox onChange={(e) => setAcceptsPets(e.target.checked)} />} label="Akceptuję zwierzęta w mieszkaniu" />
          <FormControlLabel control={<Checkbox onChange={(e) => setAcceptsSmoking(e.target.checked)} />} label="Akceptuję palenie papierosów" />
        </Box>

      </TabPanel>

      <TabPanel value={value} index={2}>
        <FormControl>
          <Typography sx={{color: '#000', fontSize: '1.2rem', mb: 2}}>Mam mieszkanie</Typography>
          <RadioGroup
            aria-label="hasFlat"  
            value={hasFlat}
            onChange={(e) => e.target.value === 'false' ? (setHasFlat(false), setsearchOption(3)) : (setHasFlat(true), setsearchOption(1))}
            name="hasFlat"
            row
            sx={{display: 'flex', flexDirection: 'row', width: '30%', justifyContent: 'space-between'}}
          >
            <FormControlLabel value={false} control={<Radio />} label="Nie" />
            <FormControlLabel value={true} control={<Radio />} label="Tak" />
          </RadioGroup>
        </FormControl>

        <Divider sx={{my: 2}}/>

        {
          hasFlat === false ?
            <>
              <Typography sx={{color: '#000', fontSize: '1.2rem', my: 2}}>Jakiego pokoju szukam</Typography>
              <FormControl>
                <RadioGroup
                  aria-label="searchOption"  
                  value={searchOption}
                  onChange={(e) => setsearchOption(e.target.value)}
                  name="searchOption"
                  row
                  sx={{display: 'flex', flexDirection: 'row', width: '60%', justifyContent: 'space-between', lineHeight: '1.5rem'}}

                >
                  <FormControlLabel  control={<Radio value={2} />} label="Oddzielnego" />
                  <FormControlLabel  control={<Radio value={3} />} label="Współdzielonego" />
                </RadioGroup>
              </FormControl>

              <Divider sx={{my: 2}}/>
              <FormControl>
                <Typography sx={{color: '#000', fontSize: '1.2rem', my: 2}}>Liczba współlokatorów w mieszkaniu</Typography>
                <Select
                  native
                  value={numberOfPeople}
                  onChange={(e) => setnumberOfPeople(e.target.value)}
                  inputProps={{
                    name: 'numberOfPeople',
                    id: 'numberOfPeople',
                  }}
                  sx={{width: '13%',
                    '@media (max-width: 600px)': {
                      width: '30%'
                    }
                  }}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Select>
              </FormControl>
            </>  
            :
            <>
              <Typography sx={{color: '#000', fontSize: '1.2rem', my: 2}}>Kogo szukam</Typography>
              <FormControl>
                <RadioGroup
                  aria-label="searchOption"  
                  value={searchOption}
                  onChange={(e) => setsearchOption(e.target.value)}
                  name="searchOption"
                  row
                  sx={{display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'space-between', lineHeight: '1.5rem'}}

                >
                  <FormControlLabel  control={<Radio value={0} />} label="Współlokatora to oddzielnego pokoju" />
                  <FormControlLabel  control={<Radio value={1} />} label="Współlokatora do współdzielonego pokoju" />
                </RadioGroup>
              </FormControl>

              <FormControl>
                <Typography sx={{color: '#000', fontSize: '1.2rem', my: 2}}>Liczba współlokatorów w mieszkaniu</Typography>
                <Select
                  native
                  value={numberOfPeople}
                  onChange={(e) => setnumberOfPeople(e.target.value)}
                  inputProps={{
                    name: 'numberOfPeople',
                    id: 'numberOfPeople',
                  }}
                  sx={{width: '20%'}}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3+</option>
                </Select>
              </FormControl>

              <FormControl>
                <Typography sx={{color: '#000', fontSize: '1.2rem', my: 2}}>Ilość pokoi w mieszkaniu</Typography>
                <Select
                  native
                  value={numberOfRooms}
                  onChange={(e) => setnumberOfRooms(e.target.value)}
                  inputProps={{
                    name: 'numberOfPeople',
                    id: 'numberOfPeople',
                  }}
                  sx={{width: '20%'}}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3+</option>
                </Select>
              </FormControl>

              <FormControl>
                <Typography sx={{color: '#000', fontSize: '1.2rem', my: 2}}>Opis mieszkania</Typography>
                <TextField
                  id="opis-mieszkania-static"
                  multiline
                  rows={5}
                  placeholder='Opisz mieszkanie'
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl sx={{width: '100%'}}>
                {
                  filesToShow !== [] ?
                    <ImageList sx={{ width: 500, height: 450, mt:2 }} cols={3} rowHeight={164} variant="masonry">
                      {filesToShow.map((item, index) => (
                        <ImageListItem key={index}>
                          <img
                            src={item}
                            loading="lazy" 
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                    : 
                    <></>
                }

                <Typography sx={{color: '#000', fontSize: '1.2rem', my: 2}}>Dodaj  zdjęcia mieszkania</Typography>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple={true}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                  />
                  <Button variant="contained" fullWidth color="primary" sx={{display: 'flex', justifyContent:'center', alignItems: 'center', fontSize:'1rem'}} onClick={handleButtonClick}>
                    Dodaj zdjęcia <CloudUpload sx={{ml: 2}}/>
                  </Button>
                </div>
              </FormControl>

              {/* {isLoaded &&  <> 
                <Typography sx={{color: '#000', fontSize: '1.2rem', my: 2}}>Pokaż na mapie</Typography>
                <GoogleMap
                  onLoad={setMap}
                  onClick={handleMapClick}
                  center={center}
                  zoom={11}
     
                  mapContainerClassName='map-container'
                >
                  {marker && <Marker position={marker} />}

              
                </GoogleMap>
              </>
              } */}

              {isLoaded ? (
                <div>
                  <StandaloneSearchBox
                    onLoad={(ref) => (searchBoxRef.current = ref)}
                    onPlacesChanged={() => onPlacesChangedRef.current()}
                  >
                    <input
                      type="text"
                      placeholder="Wpisz adres.."
                      className={styles.outline}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        margin: '1rem 0',
                        borderRadius: '4px',
                        border: '1px solid #c9c9c9',
                        backgroundColor: 'transparent',

                      }}
                    />

                  </StandaloneSearchBox>

                  <GoogleMap
                    mapContainerClassName='map-container'
                    onLoad={(map) => (mapRef.current = map)}
                    onClick={handleMapClick}
                    center={center}
                    zoom={11}
                  >
                    {marker && <Marker position={marker} />}
                  </GoogleMap>
                </div>
              ) : (
                <div>Loading Google Maps...</div>
              )}
    

              
            </>
        }

        



      </TabPanel>

      {
        status === 200 ? <Alert variant="filled" severity="success" sx={{width: '40%', mt: 2}}>
        Dane zostały zapisane
        </Alert>
          : <></>
      }

      <Box sx={{width: '40%', display: 'flex', justifyContent: 'space-between', mt: 2,
        '@media (max-width: 600px)': {
          width: '100%'
        }
      }}>
        <Button variant="outlined" sx={{width: '47%',
        }} disabled={value === 0} onClick={() => setValue(value - 1)}>Wstecz</Button>
        {
          value !== 2 ? 
            <Button sx={{width: '47%'}} variant="contained" onClick={() => setValue(value + 1)} >Dalej</Button>
            :
            <Button sx={{width: '47%'}} variant="contained" onClick={handleSubmit}>Zapisz</Button>
        }
      </Box>
      
      
    </main>
  );
}

export default Characteristicsv2;