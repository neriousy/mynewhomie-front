import React from 'react';
import styles from './Chat.module.scss';
import PrivateChat from '../../components/Chat/PrivateChat';

function Chat(){
  
  return(
    <main className={styles.main}>
      {
        <PrivateChat />
      }
      
    </main>
  );
}

export default Chat;
