import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import RestaurantFinder from "../apis/RestaurantFinder";
import { useRestaurantsContext } from "../context/RestaurantContext";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import StarRating from "../components/StarRating";

const RestaurantDetailPage = () => {
  const { selectedRestaurant, setSelectedRestaurant } = useRestaurantsContext();
  const { id } = useParams();

  useEffect(() => {
    RestaurantFinder.get(`/${id}`)
      .then((response) => {
        const { name, location, price_range, average_rating, reviews_count } = response.data.data.restaurant;
        setSelectedRestaurant({
          name,
          location,
          priceRange: price_range,
          average_rating,
          reviews_count,
          reviews: response.data.data.reviews,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  if (!selectedRestaurant) return;
  return (
    <>
      <Link to="/">Go Back</Link>
      <h1 className="text-center display-1">{selectedRestaurant.name}</h1>
      <div className="text-center">
        <StarRating rating={selectedRestaurant.average_rating} />
        <span className="text-warning mx-2">
          {selectedRestaurant.reviews_count ? `(${selectedRestaurant.reviews_count})` : "(0)"}
        </span>
      </div>
      <Reviews
        name={selectedRestaurant.name}
        location={selectedRestaurant.location}
        reviews={selectedRestaurant.reviews}
      />
      <AddReview />
    </>
  );
};

export default RestaurantDetailPage;
