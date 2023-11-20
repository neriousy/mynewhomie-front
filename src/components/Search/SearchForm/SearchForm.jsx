import React, {useState, useRef} from 'react';
import styles from './SearchForm.module.scss';
import SearchResultGrid from '../SearchResult/SearchResultGrid/SearchResultGrid';
import { TextField, Box, Stack, Select, MenuItem, Button, FormControlLabel, Checkbox, FormControl, InputLabel, Grid, Pagination, RadioGroup, Radio, FormLabel } from '@mui/material';
import { GridSvg } from '../../../assets/img/svg/GridSvg/GridSvg';
import { ListSvg } from '../../../assets/img/svg/ListSvg/ListSvg';
import SearchResultList from '../SearchResult/SearchResultList/SearchResultList';
import { useSearch } from './hooks/useSearch';


function SearchForm({char}){
  
  const {search, isLoading} = useSearch();


  // Form data
  const [city, setCity] = useState(char['livesIn'] ? char['livesIn'] : 'Gdańsk');
  const [ageFrom, setAgeFrom] =  useState(0);
  const [ageTo, setAgeTo] = useState(0);
  const [gender, setGender] = useState(char['preferedGender'] ? char['preferedGender'] : 'O');
  // Advanced form data
  const [isWorking, setIsWorking] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [isDrinking, setIsDrinking] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);

  //returned form data
  const [data, setData] = useState([]);


  // UI states
  const [useAdvancedFilters, setUseAdvancedFilters] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [gridView, setGridView] = useState(1);
  const gridRef = useRef(null);
  const listRef = useRef(null);
  
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);


  const handlePage = (event, value) => {
    setCurrentPage(value);
  };

  const handlePostPerPage = (e) => {
    setPostsPerPage(e.target.value);
    setCurrentPage(1);
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setData(await search({city, ageFrom, ageTo, gender, isWorking, isStudying, isDrinking, isSmoking}));
  };

  const showFilters = () => {
    setUseAdvancedFilters(prev => !prev);
  };

  const switchView = event => {
    if(event.currentTarget.id === 'gridButton' && gridView){
      return;
    }
    if(event.currentTarget.id === 'listButton' && !gridView){
      return;
    }
    if(event.currentTarget.id === 'gridButton'){
      gridRef.current.classList.add(styles.active);
      listRef.current.classList.remove(styles.active);
    }else{
      listRef.current.classList.add(styles.active);
      gridRef.current.classList.remove(styles.active);
    }
    
    setGridView(prev => !prev);
  };

  return(
    <>
      <div className={styles.formContainer}>
        <Box component="form" sx={{width: '90%', display: 'flex', justifyContent:'center'}}>
          <FormControl sx={{width: '100%', display: 'flex', justifyContent:'center'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}} xs={5}>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Select
                  sx={{background: 'rgba(255, 255, 255, 255)'}}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={city}
                  defaultValue={'Gdańsk'}
                  onChange={(e) => {setCity(e.target.value);} }
                  required
                >
                  <MenuItem value={'Gdańsk'}>Gdańsk</MenuItem>
                  <MenuItem value={'Toruń'}>Toruń</MenuItem>
                  <MenuItem value={'Warszawa'}>Warszawa</MenuItem>
                </Select>
              </Box>

              <TextField type="number" sx={{width: '15%', background: 'rgb(255, 255, 255, 255)', m:1}} InputProps={{style: {fontSize: '1em', color:'#000', background: '#fff'}}} onChange={e => setAgeFrom(e.target.valueAsNumber)} placeholder='Wiek od' variant='filled'/>

              <TextField type="number" sx={{width: '15%', background: 'rgb(255, 255, 255, 255)', m:1}} InputProps={{style: {fontSize: '1em', color:'#000', background: '#fff'}}} onChange={e => setAgeTo(e.target.valueAsNumber)} placeholder='Wiek do' variant='filled'/>

              <FormControl  sx={{width: '30%', m:1}}>
                <InputLabel id="gender">Płeć</InputLabel>
                <Select
                  sx={{background: 'rgba(255, 255, 255, 255)'}}
                  labelId="gender"
                  id="gender"
                  value={gender}
                  defaultValue={'O'}
                  onChange={(e) => {setGender(e.target.value);} }
                  required
                >
                  <MenuItem value="M">Mężczyzna</MenuItem>
                  <MenuItem value="K">Kobieta</MenuItem>
                  <MenuItem value="O">Obojętnie</MenuItem>
                </Select>
              </FormControl>
            </Box>


            {useAdvancedFilters === true ? 
              <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                <FormControlLabel sx={{color: '#000'}} control={<Checkbox onChange={e => setIsWorking(e.target.checked)}/>} labelPlacement="start" label="Osoba pracująca" />
                <FormControlLabel sx={{color: '#000'}} control={<Checkbox onChange={e => setIsStudying(e.target.checked)}/>} labelPlacement="start" label="Status studenta" />
                <FormControlLabel sx={{color: '#000'}} control={<Checkbox onChange={e => setIsDrinking(e.target.checked)}/>} labelPlacement="start" label="Nie pije alkoholu" />
                <FormControlLabel sx={{color: '#000'}} control={<Checkbox onChange={e => setIsSmoking(e.target.checked)}/>} labelPlacement="start" label="Nie pali papierosów" />
              </Box>
              : <></>
            }
          

            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
              <Button sx={{ mt: 3, mb: 2, width: '40%' }} variant="contained" type="button" onClick={showFilters}>{useAdvancedFilters === true ? 'Schowaj filtry zaawansowane' : 'Pokaz filtry zaawansowane'}</Button>
              <Button sx={{ mt: 3, mb: 2, width: '40%' }} variant="contained" type="submit" onClick={handleSubmit} disabled={isLoading}>Wyszukaj</Button>
            </Box>
          </FormControl>
        </Box>
      </div>

      {data.length !==0 ? 
        <Box sx={{width: '70%'}}>
          <Box sx={{height: '100%', width: '30%',display: 'flex', justifyContent: 'flexStart', alignItems: 'center' ,background: 'rgba(255, 255, 255, 0.9)'}}>
            <FormControl sx={{display: 'flex', justifyContent: 'center'}}>
              <FormLabel sx={{display: 'flex', justifyContent: 'center', textDecoration: 'underline', color:'#000'}} id="post-per-page">Ilość postów na strone</FormLabel>
              <RadioGroup
                row
                aria-labelledby="post-per-page"
                name="position"
                defaultValue="top"
                sx={{display: 'flex', justifyContent: 'center'}}
                onChange={handlePostPerPage}
              >
                <FormControlLabel
                  value={6}
                  control={<Radio />}
                  label="6"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value={9}
                  control={<Radio />}
                  label="9"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value={12}
                  control={<Radio />}
                  label="12"
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>

            <Box sx={{display: 'flex', justifyConten: 'center', alignItems: 'center'}}>
              {/* <ListIcon sx={{height: '2.5em', width:'auto', m:1, color:'#444', '&:hover':{color:'#000', cursor: 'pointer'}}} onClick={switchView} ref={listRef} /> */}
              <button id="gridButton" ref={gridRef} className={styles.switchButton} onClick={e => switchView(e)}>
                <GridSvg/>
              </button>
              <button id="listButton" ref={listRef} className={styles.switchButton} onClick={e => switchView(e)}>
                <ListSvg/>
              </button>
              {/* <GridViewIcon sx={{height: '2.3em', width:'auto', m:1, color:'#444', '&:hover':{color:'#000', cursor: 'pointer'}}} onClick={switchView} ref={gridRef} /> */}

            </Box>
          </Box>
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <Pagination sx={{background: 'rgba(255, 255, 255, 0.9)', margin: '1em', display: 'flex', justifyContent: 'center'}} count={Math.ceil(data.length / postsPerPage)} page={currentPage} variant="outlined" shape="rounded" onChange={handlePage} />
            
            {gridView ?
              <Grid container spacing={{ xs: 2}} columns={{ xs: 4, sm: 8, md: 12 }} sx={{height: 'auto', width: '100%'}}>
                {currentPosts.map((user, index) => (<Grid key={index} item xs={2} sm={4} md={4}> <SearchResultGrid  data={user}/> </Grid>))}
              </Grid>
              : 
              <Stack sx={{width: '100%;'}} spacing={1}>
                {currentPosts.map((user, index) => (<div key={index}> <SearchResultList  data={user}/> </div>))}
              </Stack>
            }

            <Pagination sx={{background: 'rgba(255, 255, 255, 0.9)', margin: '1em', display: 'flex', justifyContent: 'center'}} count={Math.ceil(data.length / postsPerPage)} page={currentPage} variant="outlined" shape="rounded" onChange={handlePage} />
          </Box>
        </Box> : <> </>}
      

      

    </>
  );
}

export default SearchForm;
