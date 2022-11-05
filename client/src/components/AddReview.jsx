import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
  const { id } = useParams();
  const nameRef = useRef();
  const ratingRef = useRef();
  const reviewRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const name = nameRef.current.value;
    const rating = ratingRef.current.value;
    const review = reviewRef.current.value;

    if (!name | !rating | !review) return;

    RestaurantFinder.post(`/${id}/addReview`, {
      restaurant_id: id,
      name,
      rating,
      review
    })
      .then(_ => location.reload())
      .catch(err => console.log(err));
  };

  return (
    <div className="mb-2">
      <form action="">
        <div className="row">
          <div className="form-group col-md-8 mb-4">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              ref={nameRef}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="rating">Rating</label>
            <select
              ref={ratingRef}
              id="rating"
              required
              className="form-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="review">Review</label>
          <textarea
            ref={reviewRef}
            id="review"
            rows="5"
            className="form-control"
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;