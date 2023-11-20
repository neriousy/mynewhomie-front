import React from 'react';
import { Slider, Typography  } from '@mui/material';


function CharSlider({name, value, setValue, marks, disabled=false}){

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <div style={{width: '100%', marginBottom: '3.2rem'}}>
      {/* <h5 style={{fontWeight: 400, fontSize: '1.5rem'}}>{name}</h5> */}
      <Typography gutterBottom  fontSize={'1.2rem'}> {name}</Typography>

      <Slider
        value={value}
        onChange={handleChange}
        aria-label="CharSlider"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={5}
        style={{width: '100%', color: '#1976d2'}}
        disabled={disabled}

      />

      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
        <span>{marks[0]}</span>
        <span>{marks[1]}</span>
      </div>
    </div>
  );
}

export default CharSlider;