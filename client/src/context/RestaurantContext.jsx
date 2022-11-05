import React, { useState, useContext, createContext } from "react";

const RestaurantsContext = createContext({
  restaurants: [],
  setRestaurants: () => {},
  addRestaurants: () => {},
  selectedRestaurant: {},
  setSelectedRestauran: () => {},
});

export const useRestaurantsContext = () => useContext(RestaurantsContext);

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  const addRestaurants = restaurant => {
    setRestaurants([...restaurants, restaurant]);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};