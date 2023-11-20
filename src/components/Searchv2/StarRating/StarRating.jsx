import { Tooltip } from '@mui/material';
import React from 'react';

const StarRating = ({ rating }) => {
  let roundedNumber = rating.toFixed(2);

  const filledStars = Math.round(rating); // Round the rating to the nearest whole number

  return (
    <Tooltip title={`Wskaźnik podobieństwa: ${roundedNumber}/5.00`}>
      <div>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={index < filledStars ? 'filled-star' : 'empty-star'}
            style={{cursor: 'context-menu'}}
          >
          ★
          </span>
        ))}
      </div>
    </Tooltip>
  );
};

export default StarRating;
