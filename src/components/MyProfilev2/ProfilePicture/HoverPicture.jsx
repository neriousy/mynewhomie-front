import React from 'react';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';


function HoverPicture() {
  return(
    <div style={{width: '11.9rem',
      height: '11.9rem',
      border: '1px  solid #207ad2',
      backgroundColor: '#e3edf6',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#1976d2',
      borderRadius: '50%',
    }}>
      <CameraAltOutlinedIcon sx={{width:'2rem', height:'2rem', color: '#207ad2', backgroundColor:'transparent'}}/>
      <span style={{fontSize: '0.9rem'}}>
              EDYTUJ ZDJĘCIE
      </span>
    </div>
  );
}
export default HoverPicture;