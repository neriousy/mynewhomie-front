import React from 'react';
import styles from  './Footer.module.scss';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';


function Footer(){


  return(
    <footer className={styles.footer}>
      <div className={styles.container}>
        <RoofingOutlinedIcon sx={{color: '#007FFF'}} fontSize="large" />
         Copyright © MyNewHomie 2023
      </div>
    </footer>
  );
}

export default Footer;