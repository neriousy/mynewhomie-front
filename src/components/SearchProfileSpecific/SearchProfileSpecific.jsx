import React, {useState, useEffect, useRef} from 'react';
import tempProfile from '../../assets/img/temp-profile.png';
import { Button, ListItemAvatar, Avatar, List, ListItem, ListItemText, Stack, Slider, Box, Typography, Modal, ImageList, ImageListItem } from '@mui/material';
import {LocationCity, SmokingRooms, SchoolOutlined, Pets, Work, Wc, WorkOutlined, PetsOutlined} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CharSlider from '../Characteristicsv2/CharSlider/CharSlider';
import ProfilePicture from '../Searchv2/Searchv2Results/ProfilePicture';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useChatContext } from '../../hooks/useChatContext';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import DescriptionIcon from '@mui/icons-material/Description';

const libraries = ['places'];


function SearchProfileSpecific({data, reciverId, fromChat=false}){
  console.log(data);
  const {searchDTO, characteristicsDTO, flatDTO, flatPhotos} = data;
  const { dispatchChat } = useChatContext();
  const[photo, setPhoto] = useState(null);
  const nav = useNavigate();
  const searchOption =  ['Szukam współlokatora oddzielnego pokoju w mieszkaniu',
    'Szukam współlokatora do wspóldzielonego pokoju w mieszkaniu',
    'Szukam współlokatora z preferencją oddzielnych pokoi',
    'Szukam współlokatora z preferencją wspóldzielonych pokoi'];
  

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const checkPhoto =  async () => {
    if(searchDTO.photo != null){
      setPhoto(`data:image\\png;base64,${searchDTO.photo}`);
    }
  };

  useEffect(() =>{
    checkPhoto();
  }, []);

  const addCorrespondent = async () => {
    const { id, firstname, lastname, photo, online } = searchDTO;
    const correspondent = {
      id,
      name: `${firstname} ${lastname}`,
      photo,
      online,
    };
    dispatchChat({ type: 'CREATE_NEW_CORRESPONDENT', payload: { correspondent } });
    nav('/chat/', {
      state: {
        receiverName: searchDTO.firstname,
        receiverId: reciverId}
    });
  };


  //Map
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const onPlacesChangedRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Map state
  const [marker, setMarker] = useState(
    flatDTO.lng !== -1 && flatDTO.lat !== -1
      ? {
        lat: flatDTO.latitude,
        lng: flatDTO.longitude,
      }
      : { lat: 0, lng: 0 } // Default center if no valid coordinates available
  );
  const [center, setCenter] = useState(
    flatDTO.lng !== -1 && flatDTO.lat !== -1
      ? {
        lat: flatDTO.latitude,
        lng: flatDTO.longitude,
      }
      : { lat: 0, lng: 0 } // Default center if no valid coordinates available
  );


  return(
    <>   
      <Box sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          overflowY: 'scroll',
        }

      }}>
        <Box sx={{width: '50%', height: '70vh', overflowY: 'auto', mr: 1,
          '@media (max-width: 600px)': {
            width: '100%',
            maxWidth: '100%',
          }}}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <ProfilePicture online={searchDTO.online} photo={photo} name={searchDTO.firstname}/>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              ml: '1rem',
              

            }}>
              <Typography sx={{fontSize: '20px', fontWeight: '400'}} >{searchDTO.firstname}   {searchDTO.lastname}</Typography>
              <Typography sx={{color: 'rgba(0, 0, 0, 0.87)', fontSize:'14px'}}>{searchDTO.age} lat</Typography>
            </Box>
          </Box>


          <List dense={false} disablePadding sx={{my: '2rem', width:'100%' }}>
            <ListItem sx={{py: 0.5, px: 0}}>
              <ListItemAvatar>
                <Avatar sx={{background: '#fff', color: '#88888F'}}>
                  <MapsHomeWorkOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={'Szukam mieszkania w: ' + characteristicsDTO.livesIn}
                secondary={null}
              />
            </ListItem>

            <ListItem sx={{py: 0.5, px: 0}}>
              <ListItemAvatar>
                <Avatar sx={{background: '#fff', color: '#88888F'}}>
                  <SchoolOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={characteristicsDTO.isStudent ? 'Jestem studentem' :  'Nie uczę się'}
                secondary={null}
              />
            </ListItem>

            <ListItem sx={{py: 0.5, px: 0}}>
              <ListItemAvatar>
                <Avatar sx={{background: '#fff', color: '#88888F'}}>
                  <WorkOutlineOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={characteristicsDTO.works ? 'Pracuję' :  'Nie pracuję'}
                secondary={null}
              />
            </ListItem>

            <ListItem sx={{py: 0.5, px: 0}}>
              <ListItemAvatar>
                <Avatar sx={{background: '#fff', color: '#88888F'}}>
                  <PetsOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={characteristicsDTO.hasPets ? 'Mam zwierzę' :  'Nie mam zwierząt'}
                secondary={null}
              />
            </ListItem>

            <ListItem sx={{py: 0.5, px: 0}}>
              <ListItemAvatar>
                <Avatar sx={{background: '#fff', color: '#88888F', transform: 'scaleX(-1)'}}>
                  <SmokingRooms />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={characteristicsDTO.smokes ? 'Palę papierosy' :  'Nie palę papierosów'}
                secondary={null}
              />
            </ListItem>

            <ListItem sx={{py: 0.5, px: 0}}>
              <ListItemAvatar>
                <Avatar sx={{background: '#fff', color: '#88888F'}}>
                  <PersonOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={characteristicsDTO.preferedGender == 'M' ? 'Płeć współlokatora: mężczyzna' :  characteristicsDTO.preferedGender == 'K' ? 'Płeć współlokatora: kobieta' : 'Płeć współlokatora: nie mam preferencji'}
                secondary={null}
              />
            </ListItem>

            
            <ListItem sx={{py: 0.5, px: 0}}>
              <ListItemAvatar>
                <Avatar sx={{background: '#fff', color: '#88888F'}}>
                  {
                    characteristicsDTO.acceptsPets ?  <CheckCircleOutlineOutlinedIcon /> : <CancelOutlinedIcon />
                  }
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={characteristicsDTO.acceptsPets ? 'Akceptuje zwierzęta w mieszkaniu' :  'Nie akceptuje zwierząt w mieszkaniu'}
                secondary={null}
              />
            </ListItem>

            <ListItem sx={{py: 0.5, px: 0}}>
              <ListItemAvatar>
                <Avatar sx={{background: '#fff', color: '#88888F'}}>
                  <DescriptionIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={searchDTO.description !== '' ? searchDTO.description :  'Brak opisu'}
                secondary={null}
              />
            </ListItem>

          </List>
          <Box sx={{
            py: 0.5, px: 0,
            mt: '2rem',
          }}>
            <Button variant="contained" type="button" onClick={addCorrespondent} disabled={fromChat}>Napisz do mnie</Button>
          </Box>
        </Box>

        <Box sx={{
          width: '50%',
          '@media (max-width: 600px)': {
            width: '100%',
            maxWidth: '100%',
          }
          
        }}>
          <TabContext  value={value} sx={{width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Charakter" value="1" />
                <Tab label="Mieszkanie" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{width: '100%', px: 0, py: 2}}>
              <List sx={{overflowY: 'auto', height: '70vh',  width:'100%', px: 1}}>
                <CharSlider name="Osobowość" value={characteristicsDTO.characterType} marks={['Introwertyk', 'Ekstrawertyk']} disabled={true}/> 
                <CharSlider name="Chodzę spać" value={characteristicsDTO.sleepTime} marks={['Wcześnie', 'Późno']} disabled={true}/>
                <CharSlider name="Gdy pojawia się problem" value={characteristicsDTO.conciliatory} marks={['Ugodowy', 'Konfliktowy']} disabled={true}/>
                <CharSlider name="Gotowanie" value={characteristicsDTO.cooking} marks={['Rzadko', 'Często']} disabled={true}/>
                <CharSlider name="Zapraszam znajomych" value={characteristicsDTO.invitingFriends} marks={['Rzadko', 'Często']} disabled={true}/>
                <CharSlider name="Rozmawiam z innymi" value={characteristicsDTO.talkativity} marks={['Rzadko', 'Często']} disabled={true}/>
                <CharSlider name="Wychodzę z mieszkania" value={characteristicsDTO.timeSpentOutsideHome} marks={['Rzadko', 'Często']} disabled={true}/>
              </List>
            </TabPanel>
            <TabPanel value="2" sx={{width: '100%', px: 0, py: 2}}>
              <List sx={{overflowY: 'auto', height: '70vh',  width:'100%', pt: 1, pb: '2rem'}}>
                <ListItem sx={{py: 0.5, px: 0, width: '100%'}}>
                  <ListItemAvatar>
                    <Avatar sx={{background: '#fff', color: '#88888F'}}>
                      <HomeOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={searchOption[flatDTO.searchOption]}
                    secondary={null}
                  />
                </ListItem>
                

                <ListItem sx={{py: 0.5, px: 0, width: '100%'}}>
                  <ListItemAvatar>
                    <Avatar sx={{background: '#fff', color: '#88888F'}}>
                      <PeopleAltOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={flatDTO.searchOption == 0 || flatDTO.searchOption == 1 ? 'Aktualna liczba współlookatorów: ' + flatDTO.numberOfPeople : 'Preferowana liczba współlookatorów: ' + flatDTO.numberOfPeople}
                    secondary={null}
                  />
                </ListItem>
                <ListItem sx={{py: 0.5, px: 0, width: '100%'}}>
                  <ListItemAvatar>
                    <Avatar sx={{background: '#fff', color: '#88888F'}}>
                      <NumbersOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={flatDTO.searchOption == 0 || flatDTO.searchOption == 1 ? 'Liczba pokoi: ' + flatDTO.numberOfRooms : 'Preferowana liczba pokoi: ' + flatDTO.numberOfRooms}
                    secondary={null}
                  />
                </ListItem>
                {
                  (flatDTO.searchOption == 0 || flatDTO.searchOption == 1) &&
                  <>
                    <ListItem sx={{py: 0.5, px: 0, width: '100%'}}>
                      <ListItemAvatar>
                        <Avatar sx={{background: '#fff', color: '#88888F'}}>
                          <DescriptionOutlinedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={'Opis mieszkania: '  + flatDTO.description}
                        secondary={null}
                      />
                    </ListItem>

                    
                    {
                      flatPhotos !==[] ?
                        <ListItem sx={{py: 0.5, px: 0, width: '100%'}}>
                          <ListItemAvatar>
                            <Avatar sx={{background: '#fff', color: '#88888F'}}>
                              <CameraAltOutlinedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={'Zdjęcia mieszkania'}
                            secondary={null}
                          />
                        </ListItem>
                        :
                        <></>
                    }
                   
                    {flatPhotos !== [] ?
                      <ImageList sx={{ width: '100%', height: 'auto', mt:2 }} cols={3} rowHeight={164} variant="masonry">
                        {flatPhotos.map((item, index) => (
                          <ImageListItem key={index}>
                            <img
                              src={item.url}
                              loading="lazy" 
                            />
                          </ImageListItem>
                        ))}
                      
                      </ImageList>
                      : 
                      <></>
                    }

                    <ListItem sx={{py: 0.5, px: 0, width: '100%'}}>
                      <ListItemAvatar>
                        <Avatar sx={{background: '#fff', color: '#88888F'}}>
                          <LocationOnOutlinedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={'Lokalizacja mieszkania'}
                        secondary={null}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      />
                    </ListItem>
                    {isLoaded ? (
                      <div style={{padding: '0.5rem'}}>
                        <GoogleMap
                          mapContainerClassName='map-container-specific'
                          onLoad={(map) => (mapRef.current = map)}
                          center={center}
                          zoom={11}
                          
                          options={{
                            mapTypeControlOptions: {
                              mapTypeIds: ['roadmap'], // Show only the roadmap view
                            },
                            streetViewControl: false
                          }}
                        
                        >
                          {marker && <Marker position={marker} />}
                        </GoogleMap>
                      </div>
                    ) : (
                      <div>Loading Google Maps...</div>
                    )}


                  </>
                }
 
              </List>
            
            </TabPanel>
          </TabContext>
        </Box>  
      </Box>
    </>


  );
}

export default SearchProfileSpecific;