CREATE DATABASE yelp;

CREATE TABLE restaurants (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range BETWEEN 1 AND 5)
);

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating BETWEEN 1 AND 5),
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id)
);

/** restaurants */
INSERT INTO restaurants (name, location, price_range) VALUES('McDonalds', 'New York', 3), ('Wendy', 'Denver', 4);

/** reviews */
INSERT INTO reviews(name, review, rating, restaurant_id) VALUES('John Doe', 'I love french fries.', 4, 2);
INSERT INTO reviews(name, review, rating, restaurant_id) VALUES('Jane Doe', 'I love cheese burger with coke.', 5, 2), ('Joan Doe', 'I hate their food.', 1, 2);


/** alter column type */ 
ALTER TABLE reviews
ALTER COLUMN restaurant_ID TYPE BIGINT;

/** alter column name */ 
ALTER TABLE reviews
RENAME COLUMN restaurants_id TO restaurant_id;


/** Query restaurants and their reviews  */

SELECT * 
FROM restaurants
LEFT JOIN (
    SELECT restaurant_id, COUNT(*),TRUNC(AVG(rating), 1) AS average_rating
    FROM reviews GROUP BY restaurant_id
) AS r
    ON restaurants.id = r.restaurant_id
