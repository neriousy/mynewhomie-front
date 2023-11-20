import React, {useEffect, useState} from 'react';
import CharacteristicsForm from '../../components/Characteristics/CharacteristicsForm/CharacteristicsForm';
import styles from './Characteristics.module.scss';


function Characteristics(){
  let charList = JSON.parse(window.localStorage.getItem('characteristics'));
  if(charList === null){
    charList = [];
  }
  
  return(
    <>
      <main className={styles.main}>
        <CharacteristicsForm charList={charList}/>
      </main>
    </>
  );
}

export default Characteristics;