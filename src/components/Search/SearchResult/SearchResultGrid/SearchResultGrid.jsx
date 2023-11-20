import React, {useState} from 'react';
import styles from './SearchResultGrid.module.scss';
import tempProfile from '../../../../assets/img/temp-profile.png';
import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

function SearchResultGrid({data}){
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
    <Link to={`/search/user/${data.id}`}>
      <div className={styles.resultContainer}>
        <span className={styles.status}><div className={data.online === true ? styles.greenDot : styles.redDot}></div> {data.online === true ? ' Online' : ' Offline'}</span>
        <Avatar sx={{marginTop: 3, width: 'auto', height: '200px'}} src={photo} alt='Profile picture'/>

        <div className={styles.information}>
          <span className={styles.name}>{data.firstname}, {data.age}</span>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultGrid;