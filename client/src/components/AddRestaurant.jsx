import { useRef } from 'react';

import { useRestaurantsContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddRestaurant = () => {
  const { addRestaurants } = useRestaurantsContext();
  const nameRef = useRef();
  const locationRef = useRef();
  const priceRangeRef = useRef();
  if (priceRangeRef.current) priceRangeRef.current.value = "Price Range";

  const handleSubmit = e => {
    e.preventDefault();

    const name = nameRef.current.value;
    const location = locationRef.current.value;
    const priceRange = priceRangeRef.current.value;

    if (!name | !location | !priceRange) return;

    RestaurantFinder.post("/", {
      name,
      location,
      price_range: priceRange,
    })
      .then((response) => {
        addRestaurants(response.data.data.restaurant);
        nameRef.current.value = "";
        locationRef.current.value = "";
        priceRangeRef.current.value = "Price Range";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="row">
          <div className="col">
            <input
              ref={nameRef}
              type="text"
              className="form-control"
              placeholder="name"
              required
            />
          </div>
          <div className="col-auto">
            <input
              ref={locationRef}
              type="text"
              className="form-control"
              placeholder="location"
              required
            />
          </div>
          <div className="col-auto">
            <select
              ref={priceRangeRef}
              className="form-select my-1 mr-sm-2"
              required
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;