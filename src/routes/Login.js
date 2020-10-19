import { Text, Flex } from '@chakra-ui/core';
import React from 'react';
import { GoogleButton } from '../components/googleButton';

export const Login = () => {
  return (
    <Flex align='center' mt={200} direction='column'>
      <Text mb={25}>Login with Google</Text>
      <GoogleButton />
    </Flex>
  )
}