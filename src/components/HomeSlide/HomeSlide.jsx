import React from 'react';
import styles from './HomeSlide.module.scss';

function HomeSlide(){
  return(
    <section id="home" className={styles.slide}>
      <div className={styles.appHeader}>
        <span className={styles.appName}>My New Homie</span>

        <span className={styles.appDesc}>
          NIE WAŻNE GDZIE, WAŻNE Z KIM
        </span>
      </div>
    </section>
  );
}

export default HomeSlide;