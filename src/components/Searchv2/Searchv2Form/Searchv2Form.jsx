import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, Tooltip, Typography } from '@mui/material';
import React, {useState} from 'react';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AdvancaedFilters from './AdvancedFilters/AdvancaedFilters';
import { useSearch } from '../hooks/useSearch';
import Searchv2Reults from '../Searchv2Results/Searchv2Reults';

function Searchv2Form() {
  const { search, simmiilarSearch, isLoading, isLoadingSimmilar } = useSearch();
  const[city, setCity] = useState('');
  const[preferredGender, setPreferredGender] = useState('O');
  const[ageFrom, setAgeFrom] = useState(18);
  const[ageTo, setAgeTo] = useState(100); 
  const[isSmoking, setIsSmoking] = useState(false);
  const[isDrinking, setIsDrinking] = useState(false);
  const[isWorking, setIsWorking] = useState(false);
  const[isStudying, setIsStudying] = useState(false);

  const[data, setData] = useState([]);

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleAdvancedSearch = (data) => {
    setData(data);
  };

  const hnadleSimmiilarSearch = async (e) => {
    e.preventDefault();
    setData(await simmiilarSearch());
  };



  const handleSearch = async (e) => {
    e.preventDefault();
    if(city === '') return alert('Wybierz miasto');

    setData(await search({city, ageFrom, ageTo, preferredGender, isWorking, isStudying, isDrinking, isSmoking}));
  };

  
  return (
    <>
      <Box component="form" sx={{width: '100%', display: 'flex', my: 1, justifyContent: 'space-between',
        '@media (max-width: 600px)': {
          flexDirection: 'column',
        }
    
      }}>
        <Box sx={{width: '80%', display: 'flex', justifyContent:'flex-start', gap: '2rem',
          '@media (max-width: 600px)': {
            width: '100%',
            flexDirection: 'column',
            gap: '1rem'
          }
        }}>
          <FormControl sx={{minWidth: '10%', width:'30%',
            '@media (max-width: 600px)': {
              width: '100%',
            }
          }}>
            <InputLabel id="demo-select-small-label">Miasto</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={city}
              label="Miasto"
              onChange={(e) => setCity(e.target.value)}
              required={true}
              sx={{'@media (max-width: 600px)': {
                width: '100%',
              }}}
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

          <TextField type="number" label="Wiek od" required={true}
            inputProps={{min: 18,
            }} onChange={(e) => setAgeFrom(parseInt(e.target.value))} sx={{minWidth: '100px', maxWidth: '8%',
              '@media (max-width: 600px)': {
                width: '100%',
                maxWidth: '100%',
              }
            }} />
          <TextField type="number" label="Wiek do" required={true}
            inputProps={{min: 18,
            }} onChange={(e) => setAgeTo(parseInt(e.target.value))} sx={{minWidth: '100px', maxWidth: '8%',
              '@media (max-width: 600px)': {
                width: '100%',
                maxWidth: '100%',
              }
            }} />
          
          <FormControl sx={{width: '18%',
            '@media (max-width: 600px)': {
              width: '100%',
              maxWidth: '100%',
            }
          }}>
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
              required={true}
            >
              <MenuItem disabled value="">
                <em>Wybierz płeć</em>
              </MenuItem>
              <MenuItem value="O">Obojętnie</MenuItem>
              <MenuItem value="M">Mężczyzna</MenuItem>
              <MenuItem value="K">Kobieta</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" sx={{
            borderColor: 'rgba(0, 0, 0, 0.2)',
            color: 'rgba(0, 0, 0, 0.6)',
            minWidth:'15%',
            textTransform: 'none',
            ':hover': {
              border: '1px solid #000'
            },

            height: '56px'
          }}
          onClick={handleOpen}
          
          >
            <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
        Wszystkie filtry
              <BuildOutlinedIcon />
            </span>
          </Button>
        </Box>

        <Box sx={{width:'15%',
          marginLeft: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          '@media (max-width: 600px)': {
            width: '100%',
            maxWidth: '100%',
            marginTop: 2
          }
        }}> 
          <Button variant="contained" type="submit" sx={{
            textTransform: 'none',
            width: '100%',
            p:'1rem 0',
          }}
          onClick={handleSearch}
          disabled={isLoadingSimmilar || isLoading}
          >
        Szukaj
          
          </Button>
          <Tooltip title={<Typography fontSize={'0.8rem'}>Wyszukaj użytkowników na podstawie podanych przez Ciebie cech</Typography>}>
            <Button variant="outlined" type="submit" sx={{
              textTransform: 'none',
              width: '100%',
              p:'1rem 0',
            }}
            onClick={hnadleSimmiilarSearch}
            disabled={isLoadingSimmilar || isLoading}
            >
            Wyszukaj podobnych do mnie
            </Button>
          </Tooltip>

        </Box>
      </Box>

      <Searchv2Reults data={data}/> 
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '0%',
          right: '0',
          height: '100vh',
          width: '30vw',
          bgcolor: 'background.paper',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'column',
          p: '21px',
          animation: 'slideIn 0.3s ease-in-out forwards',
          '@keyframes slideIn': {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0)' },
          },
          '@media (max-width: 600px)': {
            width: '100%',
            maxWidth: '100%',
          },
 

        }}>
          <Button sx={{
            ml: 'auto',
            height: '30px',
            width: '30px',
            p: 0,
            borderRadius: '0',
            minWidth: 'unset',
          }}
          onClick={handleClose}
          >
            <CloseIcon sx={{color: '#000' }} />
          </Button>

          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: '400',
              m: '1rem',
              letterSpacing: '0.5px',
              lineHeight: '150%',
            }}
          >
            Filtruj
          </Typography>

          <Box sx={{width: '100%', height:'100%', p: ' 1rem',overflowY: 'auto'}}>
            <AdvancaedFilters  handleAdvancedSearch={handleAdvancedSearch} />
          </Box>

        </Box>
      
      </Modal>


    </>

  );
}

export default Searchv2Form;