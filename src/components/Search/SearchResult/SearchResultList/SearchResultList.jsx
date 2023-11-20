import React, { useState, useEffect} from 'react';
import styles from './SearchResultList.module.scss';
import tempProfile from '../../../../assets/img/temp-profile.png';
import { Avatar } from '@mui/material';

function SearchResultList({data}){
  const[photo, setPhoto] = useState(tempProfile);

  const checkPhoto =  async () => {
    if(data.photo != null){
      setPhoto(`data:image\\png;base64,${data.photo}`);
    }
  };

  useEffect(() => {
    checkPhoto();
  }, []);


  return(
    <div className={styles.resultContainer}>
      
      <Avatar sx={{marginTop: 3, width: '20%', height: 'auto'}} src={photo} alt='Profile picture'/>
      
      <div className={styles.information}>
        <span className={styles.status}><div className={data.online === true ? styles.greenDot : styles.redDot}></div> {data.online === true ? ' Online' : ' Offline'}</span>
        <span className={styles.name}>{data.firstname}, {data.age}</span>
        <span className={styles.desc}>Student</span>
        <span className={styles.desc}></span>
      </div>
    </div>
  );
}

export default SearchResultList;