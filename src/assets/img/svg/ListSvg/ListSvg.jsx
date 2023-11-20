import React from 'react';
import styles from './ListSvg.module.scss';

export const ListSvg = () => {
  return (
    <div className={styles.box}>
      <svg enableBackground="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" className={styles.list} xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
        <g>
          <g id="Grid"/>
          <g id="Meter"/>
          <g id="Email"/>
          <g id="Email_Notification"/>
          <g id="Inbox"/>
          <g id="Inbox_Notification"/>
          <g id="List">
            <g>
              <g>
                <rect height="1" width="1" x="6" y="9.4"/>
                <line fill="none" stroke="#515151" strokeMiterlimit="10" x1="8.1" x2="26" y1="10" y2="10"/>
              </g>
              <g>
                <rect height="1" width="1" x="6" y="13.5"/>
                <line fill="none" stroke="#515151" strokeMiterlimit="10" x1="8.1" x2="26" y1="14" y2="14"/>
              </g>
              <g>
                <rect height="1" width="1" x="6" y="17.5"/>
                <line fill="none" stroke="#515151" strokeMiterlimit="10" x1="8.1" x2="26" y1="18" y2="18"/>
              </g>
              <g>
                <rect height="1" width="1" x="6" y="21.5"/>
                <line fill="none" stroke="#515151" strokeMiterlimit="10" x1="8.1" x2="26" y1="22" y2="22"/>
              </g>
            </g>
          </g>
          <g id="Grid_1_"/>
          <g id="Add"/>
          <g id="Minus"/>
          <g id="Basket"/>
        </g>
      </svg>
    </div>
  ); 
};



