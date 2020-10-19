import { Box, Flex } from '@chakra-ui/core';
import React from 'react';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

export const renderStars = rating => {
  const amt = rating.split('.');
  const stars = [];
  for (let i = 0; i < parseInt(amt[0]); i++) {
    stars.push(<Box as={BsStarFill} color='yellow.500' />)
  }

  if (amt[1] === '5') stars.push(<Box as={BsStarHalf} color='yellow.500' />);
  
  return <Flex>{stars}</Flex>;
}