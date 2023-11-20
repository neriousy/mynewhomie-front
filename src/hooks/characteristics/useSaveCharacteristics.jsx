import { useState } from 'react';
import { useGetCharacteristics } from './useGetCharacteristics';
import { useAuthContext } from '../useAuthContext';
import { useFlatPhoto } from '../../hooks/useFlatPhoto';

export const useSaveCharacteristics = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatchAuth, user, userData } = useAuthContext();
  const [status, setStatus] = useState(null);
  const { getChars } = useGetCharacteristics();

  const uploadFlatPhoto = async (photos) =>{
    const formData = new FormData();


    // Append each file to the formData
    
    photos.forEach((image, index) => {
      formData.append('files', image);
    });
  
  
    setIsLoading(true);
    setError(null);

    
    const response = await fetch(process.env.REACT_APP_API_URL + '/flat/add-photo', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + user.token},
      body: formData,
      credentials: 'include'
    });

    if(response.status === 200) {
      setIsLoading(false);
      setStatus(200);
    }

    if(response.status !== 200){
      setIsLoading(false);
      setStatus(400);
    }

    return response.status;
  };

  const saveCharacteristics = async (formData, filesToSend) =>{
    let  { sleepTime,
      cooking,
      invitingFriends,
      timeSpentOutsideHome,
      characterType,
      talkativity,
      conciliatory,
      hasPets,
      smokes,
      drinks,
      isStudent,
      works,
      acceptsPets,
      acceptsSmoking,
      preferedGender,
      livesIn,
      hasFlat,
      searchOption,
      numberOfRooms,
      numberOfPeople,
      description,
      marker,
      userId,
      token } = formData;

    works = parseInt(works);
    hasPets = parseInt(hasPets);
    acceptsPets = parseInt(acceptsPets);
    acceptsSmoking = parseInt(acceptsSmoking);
    console.log(isStudent);
    isStudent = isStudent === true ? 1 : 0;
    hasFlat = hasFlat === true ? 1 : 0;
    drinks = drinks === true ? 1 : 0;
    acceptsPets = acceptsPets === true ? 1 : 0;
    acceptsSmoking = acceptsSmoking === true ? 1 : 0;
    hasPets = hasPets === true ? 1 : 0;
    smokes = smokes === true ? 1 : 0;
    works = works === true ? 1 : 0;
    searchOption = parseInt(searchOption);



    const { lat, lng } = marker;

    setIsLoading(true);
    setError(null);


    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/saveUserAllCharacteristics', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token},
      body: JSON.stringify({sleepTime,
        cooking,
        invitingFriends,
        timeSpentOutsideHome,
        characterType,
        talkativity,
        conciliatory,
        hasPets,
        smokes,
        drinks,
        isStudent,
        works,
        acceptsPets,
        acceptsSmoking,
        preferedGender,
        livesIn,
        hasFlat,
        searchOption,
        numberOfRooms,
        numberOfPeople,
        description,
        latitude: lat,
        longitude: lng,
        likesPets: 1,
        userId: userData.userId,}),
      credentials: 'include'
    });

    if(response.status === 200) {
      
      setIsLoading(false);
      setStatus(200);

    }

    if(response.status !== 200){
      setIsLoading(false);
      setStatus(400);
    }

    const upload = await uploadFlatPhoto(filesToSend);


    return response.status;

    
  }; 

  return { saveCharacteristics, isLoading, error, status };
}; 