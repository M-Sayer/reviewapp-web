const url = 'https://boiling-taiga-27282.herokuapp.com';

export const getReviews = async () => {
  try {
    const reviews = await fetch(`${url}/reviews`);
    return reviews.json();
  } catch (e) {
    console.log(e);
  }
}

export const postComment = async comment => {
  try {
    await fetch(`${url}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
  } catch (e) {
    console.log(e);
  }
}

export const getCommentsForReview = async reviewId => {
  try {
    const comments = await fetch(`${url}/comments/review/${reviewId}`);
    return comments.json();
  } catch(e) {
    console.log(e);
  }
}

export const updateReviewPoints = async (reviewId, amt) => {
  try {
    await fetch(`${url}/reviews/${reviewId}/points`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(amt),
    });
  } catch(e) {
    console.log(e);
  }
}