import { Box, Button, Collapse, Flex, Icon, Input, Stack, Text, Textarea } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { getCommentsForReview, postComment, updateReviewPoints } from '../services/apiService';
import { parseDate } from '../utils/parseDate';
import { renderStars } from '../utils/renderStars';


export const ReviewCard = props => {
  const r = props.review;
  const date = parseDate(r.created_at);
  const initialState = {
    author: '',
    body: '',
  }
  
  const [input, setInput] = useState({...initialState}); // form state
  const [comments, setComments] = useState([]); // list of review comments
  const [showComments, setShowComments] = useState(false); // display comments?
  const [commenting, setCommenting] = useState(false); // user leaving a comment?
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function getComments() {
      const data = await getCommentsForReview(r.id);
      data && setComments(data);
    };

    getComments();
  }, [commenting]);

  // comment on review
  const handleSubmit = async () => {
    if (!input.author || !input.body) return setError('Please fill out all fields');
    await postComment({ review_id: r.id, ...input });
    setCommenting(false);
    setInput({...initialState});
  }

  const handleUpdatePoints = async value => {
    await updateReviewPoints(r.id, { amount: value });
    props.toggle() //refetch reviews
  }

  const renderComments = () => {
    const replies = [...comments];
    replies.sort((a, b) => {
      if (a.created_at < b.created_at) return -1;
      return 1;
    });

    if (!props.sortComments) replies.reverse();

    return replies.map(reply => (
      <Box 
        key={reply.id} 
        ml={10}
        width='80%' 
        p={2} 
        shadow="md" 
        borderWidth="1px"
      >
        <Flex>
          <Text>{reply.author}</Text>
          <Text ml='auto'>{parseDate(reply.created_at)}</Text>
        </Flex>
        <Text>{reply.body}</Text>
      </Box>
    ))
  }

  return (
    <Box width='80%'>
      <Box m={4}>
        <Button mr={2} color='green.500' onClick={() => handleUpdatePoints(1)}>
          <Icon name='arrow-up' />
        </Button>
          {r.points}
        <Button ml={2} color='red.500' onClick={() => handleUpdatePoints(-1)}>
          <Icon name='arrow-down' />
        </Button>
      </Box>
      <Box>
        <Box p={5} shadow="md" borderWidth="1px">
            <Flex>
              {renderStars(r.rating)}
              <Text ml='auto'>{date}</Text>
            </Flex>
            <Text mt={3} mb={5}>{r.message}</Text>
            <Flex direction='row' justify='flex-end'>
              <Box mr='auto'>
                {!commenting && 
                  <Button variantColor='green' ml='auto' onClick={() => setCommenting(true)}>
                    Reply
                  </Button>
                }
              </Box>
              <Box>
                { 
                  comments.length > 0 ? 
                  showComments
                    ? (
                      <Button variantColor='orange' onClick={() => setShowComments(false)}>
                        hide comments <Icon name='chevron-up' />
                      </Button>
                    )
                    : (
                      <Button variantColor='teal' onClick={() => setShowComments(true)}>
                        show comments <Icon name='chevron-down' />
                      </Button>
                    )
                  : null
                }
              </Box>
            </Flex>
        </Box>
        <Collapse mt={2} mb={5} ml='10%' w='80%' isOpen={commenting}>
            {error && <Text m={5} color='red.500' textAlign='center'>{error}</Text>}
          <Box>
            <Input
              mb={2} 
              value={input.author}
              onChange={e => {
                setInput({ ...input, author: e.target.value });
                setError(null);
              }}
              placeholder='name...' 
            />
            <Textarea 
              mb={2}
              value={input.body}
              onChange={e => {
                setInput({ ...input, body: e.target.value });
                setError(null);
              }}
              placeholder='leave a comment...' 
            />
            <Flex justify='center'>
              <Button variantColor='green' mr={5} onClick={handleSubmit}>
                Submit
              </Button>
              <Button variantColor='red' ml={5} onClick={() => setCommenting(false)}>
                Cancel
              </Button>
            </Flex>
          </Box>
        </Collapse>
      </Box>
        <Collapse isOpen={showComments}>
          <Stack spacing={4} mb={10}>
            {renderComments()}
          </Stack>
        </Collapse>
    </Box>
  );
}