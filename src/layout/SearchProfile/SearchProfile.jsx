import React, {useEffect, useState} from 'react';
import styles from './SearchProfile.module.scss';
import { useParams } from 'react-router-dom';
import SearchProfileSpecific from '../../components/SearchProfileSpecific/SearchProfileSpecific';
import { useUser } from '../../components/SearchProfileSpecific/hooks/useUser';

function SearchProfile({id}){

  console.log(id);
  const{ userDetails, status, isLoading, data} = useUser(id);

  return(
    <div>
      {
        isLoading ?  <></>: 
          data !== null ? <SearchProfileSpecific data={data} reciverId={id}/> : <></>
      }
      
    </div>
  );
}

export default SearchProfile;