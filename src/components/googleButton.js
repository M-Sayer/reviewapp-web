import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch  } from 'react-redux';
import { setToken } from '../features/loginSlice';
import { Text } from '@chakra-ui/core';

const clientId = '593201953663-62cvig8lbs2pjtqq69emr8ar23ncgbgg.apps.googleusercontent.com';

export const GoogleButton = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleLogin = res => {
    dispatch(setToken(res.accessToken))
  }
  
  return (
   <>
      {error
         ? <Text>{error}</Text>
         : <GoogleLogin
            clientId={clientId}
            buttonText='Login'
            onSuccess={handleLogin}
            onFailure={() => setError('Something went wrong, please try again. (You may have cross-site tracking blocked)')}
            responseType='code, token'
          /> 
      }
   </>
  );
}