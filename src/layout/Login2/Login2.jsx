import React, { useEffect} from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import styles from './Login.module.scss';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Tab, Tabs, Grid, CssBaseline, Paper, Link } from '@mui/material';
import bg from '../../assets/img/pexels-life-of-pix-2459.jpg';
import { useNavigate } from 'react-router-dom';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={styles.fullWidth}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



function Login2(){
  const [value, setValue] = React.useState(0);
  const nav = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    nav('/forgotPassword');
  };

  return(
    
    <Grid container component="main" className={styles.height}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:'url('+ bg  + ')',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} square>
        <Box className={styles.main} sx={{mt:2}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width:'100%', display: 'flex', justifyContent: 'center' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Zaloguj się" {...a11yProps(0)} />
              <Tab label="Zarejestruj się" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <LoginForm />

            <Grid container sx={{padding: 2}}>
              <Grid item xs>
                <Link onClick={handleClick} variant="body2" sx={{fontSize: '1.1em', ':hover':{
                  cursor: 'pointer'
                }}}>
                    Przypomnij hasło
                </Link>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegisterForm />
          </TabPanel>



        
        </Box>
      </Grid>
    </Grid>
    
  );
}

export default Login2;