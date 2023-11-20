import { PhotoContext } from '../context/PhotoContext';
import { useContext } from 'react';

export const usePhotoContext = () =>{
  const context = useContext(PhotoContext);

  if(!context) {
    throw Error('usePhotoContext must be inside an PhotoContextProvider');
  }

  return context;
};