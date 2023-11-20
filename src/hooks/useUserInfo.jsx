import { json } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';


export const getUserInfo = async(token) => {
  const responseInfo = await fetch(process.env.REACT_APP_API_URL + '/api/v1/userInfo', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token},
    body: JSON.stringify(token),
    credentials: 'include'
  });
  
  let jsonInfo;
  if(responseInfo.ok){
    jsonInfo = await responseInfo.json();
    window.localStorage.setItem('userInfo', JSON.stringify(jsonInfo));
    const res = await getCharacteristics(jsonInfo.userId, token);
  }

  return jsonInfo;
};


export const getCharacteristics = async(id, token) =>{
  const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/getUserChar', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token},
    body: JSON.stringify(id),
    credentials: 'include'
  });

  if(response.status === 204){
    return false;
  }

  if(response.status === 200){
    const json = await response.json();
    window.localStorage.setItem('characteristics', JSON.stringify(json));
  }
  

};

export const saveCharacteristics = async({acceptsPets, acceptsSmoking, characterType, conciliatory, cooking, drinks, hasPets, invitingFriends, isStudent, likesPets, preferedGender, sleepTime, smokes, talkativity, timeSpentOutsideHome, works, token, userId, livesIn}) =>{

  
  works = parseInt(works);
  isStudent = parseInt(isStudent);
  hasPets = parseInt(hasPets);
  acceptsPets = parseInt(acceptsPets);
  acceptsSmoking = parseInt(acceptsSmoking);
  
  const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/saveUserChar', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token},
    body: JSON.stringify({acceptsPets, acceptsSmoking, characterType, conciliatory, cooking, drinks, hasPets, invitingFriends, isStudent, likesPets, preferedGender, sleepTime, smokes, talkativity, timeSpentOutsideHome, works, userId, livesIn}),
    credentials: 'include'
  });
  const data = await response.json();

  

  await getCharacteristics(userId, token);

};

export const saveUserInfo = async({firstname, lastname, username, age, gender, phonenumber, description, still_looking}) => {
  
  age = parseInt(age);
  const token  = JSON.parse(window.localStorage.getItem('user'))['token'];
  const userId = JSON.parse(window.localStorage.getItem('userInfo'))['userId'];
  console.log(userId);
  const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/saveUserInfo', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token},
    body: JSON.stringify({firstname, lastname, username, age, gender, phonenumber,description, userId, still_looking}),
    credentials: 'include'
  });


  return response.status;
  
};


export const search = async (token) =>{
  const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/search', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token},
    credentials: 'include'
  });

  const json = await response.json();

  return json;
};

export const updateOnline =  async (email, token) => {
  const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/activity', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token},
    body: email,
    credentials: 'include'
  });

  return response;
};