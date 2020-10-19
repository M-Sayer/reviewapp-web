import { Flex, FormLabel, Stack, Switch } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { ReviewCard } from '../components/reviewCard';
import { getReviews } from '../services/apiService';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [points, setPoints] = useState(false);
  const [sortComments, setSortComments] = useState(true);

  //using to refetch when updating points in child component
  const toggle = () => setPoints(!points); 
  
  useEffect(() => {
    async function getData() {
      const data = await getReviews();
      data && setReviews(data);
    }

    getData();
  }, [points]);

  const renderReviews = () => {
    return reviews.map(review => (
      <ReviewCard 
        key={review.id} 
        review={review}
        toggle={toggle} 
        sortComments={sortComments}
      />
    ));
  }
  
  return (
    <Flex direction='column' align='center'>
      <h1>REVIEWS</h1>
      <Stack align='center' spacing={8} mb={10}>
      <Flex ml='auto' mr='20'>
        <FormLabel htmlFor="email-alerts">show new comments first?</FormLabel>
        <Switch 
          id="email-alerts" 
          isChecked={sortComments}
          onChange={() => setSortComments(!sortComments)}
        />
      </Flex>
        {renderReviews()}
      </Stack>
    </Flex>
  );
}