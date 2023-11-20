import { useEffect, useState } from 'react';
import temp from '../../../../assets/img/temp-profile.png';

export const useSearch = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  let token;

  const search = async ({city, ageFrom, ageTo, gender, isWorking, isStudying, isDrinking, isSmoking}) => {
    let formData = new FormData();

    try{
      token  = JSON.parse(window.localStorage.getItem('user'))['token'];
    }catch{
      setStatus(400);
      setIsLoading(false);
      return;
    }

    console.log(ageTo);

    formData.append('age_from', ageFrom);
    formData.append('age_to', ageTo);
    formData.append('city', city);
    formData.append('gender', gender);
    formData.append('ifStudent', isStudying);
    formData.append('ifWorking', isWorking);
    formData.append('ifSmoking', isSmoking);
    formData.append('ifDrinkingAlc', isDrinking);


    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/test_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token},
      body: formData,
      // body:JSON.stringify({age_from: ageFrom,
      //   age_to: ageTo,
      //   city: city,
      //   gender: gender,
      //   ifStudent: isStudying,
      //   ifWorking: isWorking,
      //   ifSmoking: isSmoking,
      //   ifDrinkingAlc: isDrinking
      // }),
      credentials: 'include'
    });

    if(response.status === 200){
      setIsLoading(false);
      setStatus(200);
      const json = await response.json();
      setData(json);
      return;
    }

    if(response.status !== 200){
      setStatus(404);
      setIsLoading(false);
      
      return [];
    }

  };

  return {search, status, error, isLoading, data};
};

  



