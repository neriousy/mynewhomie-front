import { useEffect, useState } from 'react';

export const useSearch = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isLoadingSimmilar, setIsLoadingSimmilar] = useState(null);
  let token;

  const search = async ({city, ageFrom, ageTo, preferredGender, isWorking, isStudying, isDrinking, isSmoking}) => {
    let formData = new FormData();
    setIsLoading(true);

    try{
      token  = JSON.parse(window.localStorage.getItem('user'))['token'];
    }catch{
      setStatus(400);
      setIsLoading(false);
      return;
    }

    formData.append('age_from', ageFrom);
    formData.append('age_to', ageTo);
    formData.append('city', city);
    formData.append('gender', preferredGender);
    formData.append('ifStudent', isStudying);
    formData.append('ifWorking', isWorking);
    formData.append('ifSmoking', isSmoking);
    formData.append('ifDrinkingAlc', isDrinking);

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/test_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token},
      body:JSON.stringify({age_from: ageFrom,
        age_to: ageTo,
        city: city,
        gender: preferredGender,
        ifStudent: isStudying,
        ifWorking: isWorking,
        ifSmoking: isSmoking,
        ifDrinkingAlc: isDrinking
      }),
      credentials: 'include'
    });

    if(response.status === 200){
      setIsLoading(false);
      setStatus(200);
      const json = await response.json();
      return json;
    }

    if(response.status !== 200){
      setStatus(404);
      setIsLoading(false);
      
      return [];
    }

  };


  const advancedSearch = async({city, ageFrom, ageTo, preferredGender, isWorking, isStudying, isDrinking, isSmoking, hasFlat, roomType, amountOfPeople}) =>{
    try{
      token  = JSON.parse(window.localStorage.getItem('user'))['token'];
    }catch{
      setStatus(400);
      setIsLoading(false);
      return;
    }

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/extended_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token},
      body:JSON.stringify({age_from: ageFrom,
        age_to: ageTo,
        city: city,
        gender: preferredGender,
        ifStudent: isStudying,
        ifWorking: isWorking,
        ifSmoking: isSmoking,
        ifDrinkingAlc: isDrinking,
        hasFlat,
        search_option: parseInt(roomType),
        people_count: amountOfPeople,
      }),
      credentials: 'include'
    });

    if(response.status === 200){
      setIsLoading(false);
      setStatus(200);
      const json = await response.json();
      console.log(json);
      return json;
    }

    if(response.status !== 200){
      setStatus(404);
      setIsLoading(false);
      
      return [];
    }
  };

  const simmiilarSearch = async() =>{
    setIsLoadingSimmilar(true);
      
    try{
      token  = JSON.parse(window.localStorage.getItem('user'))['token'];
    }catch{
      setStatus(400);
      setIsLoadingSimmilar(false);
      return;
    }

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/similar_users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token},
      credentials: 'include'
    });

    if(response.status === 200){
      setIsLoadingSimmilar(false);
      setStatus(200);
      const json = await response.json();
      return json;
    }

    if(response.status !== 200){
      setStatus(404);
      setIsLoadingSimmilar(false);

    }

  };


  return {search, status, error, isLoading, data, advancedSearch, simmiilarSearch, isLoadingSimmilar};
};

  



