import React from 'react'

const StarRating = ({ rating }) => {
    const stars = [];
    const rndNum = Math.random() * 10000 + 1;

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
              <i key={i + rndNum} className="fas fa-star text-warning"></i>
            );
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(
              <i
                key={i + rndNum}
                className="fas fa-star-half-alt text-warning"
              ></i>
            );
        } else {
            stars.push(
              <i key={i + rndNum} className="far fa-star text-warning"></i>
            );
        }
    }

  return (
    <>{stars}</>
  )
}

export default StarRating;