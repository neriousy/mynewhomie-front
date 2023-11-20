import React, {useEffect, useState} from 'react';
import { CircularProgress } from '@mui/material';

function Loader(){

  return(
    <div style={{width: '90vh', height:'70vh', display: 'flex',  justifyContent:'center', alignItems: 'center'}}>
      <CircularProgress/>
    </div>
  );
}

export default Loader
;