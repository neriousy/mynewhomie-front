import React from 'react';
import styles from './MyProfile.module.scss';
import MyProfileForm from '../../components/MyProfileForm/MyProfileForm';


function MyProfile(){
  const data = JSON.parse(window.localStorage.getItem('userInfo'));

  return(
    <main className={styles.main}>
      <MyProfileForm data={data}/>
    </main>
  );
}

export default MyProfile;
