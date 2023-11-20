import React, {useState, useEffect} from 'react';
import { useUser } from '../../SearchProfileSpecific/hooks/useUser';
import { CircularProgress } from '@mui/material';
import { search } from '../../../hooks/useUserInfo';
import UserInfoChild from './UserInfoChild';

function UserInfo({id}){
  
  const{status, isLoading, data} = useUser(id);
  console.log(data);
  

  return(
    <>
      {
        isLoading ?  <CircularProgress/>:
          data !== null ? <UserInfoChild data={data}/> : <></>

      }
    </>
  );
}

export default UserInfo;