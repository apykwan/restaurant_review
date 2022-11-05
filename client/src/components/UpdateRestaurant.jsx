import { useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const nameRef = useRef();
    const locationRef = useRef();
    const priceRangeRef = useRef();

    useEffect(() => {
        RestaurantFinder.get(`/${id}`)
            .then(response => {
                const { name, location, price_range } = response.data.data.restaurant;
                nameRef.current.value = name;
                locationRef.current.value = location;
                priceRangeRef.current.value = price_range;
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        RestaurantFinder.put(`/${id}`, {
          name: nameRef.current.value,
          location: locationRef.current.value,
          price_range: priceRangeRef.current.value,
        })
          .then(_ => navigate('/'))
          .catch((err) => console.log(err));
    };

    return (
      <div>
        <form action="">
          <div className="form-group mb-4">
            <label htmlFor="name">Name</label>
            <input
              ref={nameRef}
              id="name"
              className="form-control"
              type="text"
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="location">Location</label>
            <input
              ref={locationRef}
              id="location"
              className="form-control"
              type="text"
            />
          </div>

          <div className="form-group mb-5">
            <label htmlFor="price_range">Price Range</label>
            <select
              ref={priceRangeRef}
              id="Price Range"
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

          <button
            type="submit"
            className="btn btn-outline-primary w-100 p-2 mb-5"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <Link to="/">Go Back</Link>
        </form>
      </div>
    );
}

export default UpdateRestaurant;