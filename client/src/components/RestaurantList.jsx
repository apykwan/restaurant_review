import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRestaurantsContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "./StarRating";

const RestaurantList = () => {
    const { restaurants, setRestaurants } = useRestaurantsContext();
    const navigate = useNavigate();

    useEffect(() => {
        RestaurantFinder.get("/")
          .then(response => {
            setRestaurants(response.data.data.restaurants);
          })
          .catch((err) => console.log(err));
    }, []);

    const handleUpdate = (e, id) => {
      e.stopPropagation();
      navigate(`/restaurants/${id}/update`);
    };

    const handleDelete = (e, id) => {
      e.stopPropagation();
      RestaurantFinder
        .delete(`/${id}`)
        .then(_ => {
          setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
        })
        .catch(err => console.log(err));
    };

    const handleRestaurantSelect = (id) => navigate(`/restaurants/${id}`);

    const renderRating = ({ average_rating, reviews_count }) => {
      const average = average_rating === null ? 0 : average_rating;
      const count = reviews_count === null ? 0 : reviews_count;
       
      return (
        <>
          <StarRating rating={average} />
          <span className="text-warning mx-2">({count})</span>
        </>
      );
    };
    
    return (
      <div className="list-group">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="table-primary">
              <th scop="col">Restaurant</th>
              <th scop="col">Location</th>
              <th scop="col">Price Range</th>
              <th scop="col">Ratings</th>
              <th scop="col">Edit</th>
              <th scop="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {restaurants &&
              restaurants.map((restaurant) => (
                <tr
                  sytle={{ cursor: "pointer" }}
                  key={restaurant.id}
                  onClick={handleRestaurantSelect.bind(null, restaurant.id)}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={e => handleUpdate(e, restaurant.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={e => handleDelete(e, restaurant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
};

export default RestaurantList;