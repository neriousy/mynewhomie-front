import React, {useState} from 'react';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchForm from '../../components/Search/SearchForm/SearchForm';
import Searchv2Form from '../../components/Searchv2/Searchv2Form/Searchv2Form';
import { Box, Divider, Modal } from '@mui/material';
import { useEffect } from 'react';

function Search(){


  let charList = JSON.parse(window.localStorage.getItem('characteristics'));

  
  if(charList === null){
    charList = [];
  }






  return(
    <>
      <main className={styles.main}>
        <div className={styles.cover}>
          <h4>
          Wyszukaj współlokatora 
          </h4>

          <Divider sx={{my: 2}}/>
          <Searchv2Form/>
          
        </div>

        

      </main>
    </>
  );
}

export default Search;