import { Flex, FormLabel, Stack, Switch, Text } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { ReviewCard } from '../components/reviewCard';
import { getReviews } from '../services/apiService';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [points, setPoints] = useState(false);
  const [sortComments, setSortComments] = useState(true);
  const [loading, setLoading] = useState(true)

  //using to refetch when updating points in child component
  const toggle = () => setPoints(!points); 
  
  useEffect(() => {
    async function getData() {
      const data = await getReviews();
      data && setReviews(data);
      setLoading(false);
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
      {!loading && <h1>REVIEWS</h1>}
      <Stack align='center' spacing={8} mb={10}>
      <Flex ml='auto' mr='20'>
        {loading && <Text>Loading...</Text>}
        {reviews.length > 0 && 
          <>
            <FormLabel htmlFor="email-alerts">show new comments first?</FormLabel>
            <Switch 
              id="email-alerts" 
              isChecked={sortComments}
              onChange={() => setSortComments(!sortComments)}
            />
          </>
        }
      </Flex>
        {renderReviews()}
      </Stack>
    </Flex>
  );
}