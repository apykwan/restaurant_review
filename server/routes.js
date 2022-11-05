const { application } = require('express');
const express = require('express');

const db = require('./db');

route = express.Router();

route.get("/restaurants", async (req, res) => {
    try {
        const results = await db.query(`
            SELECT * 
            FROM restaurants 
            LEFT JOIN (
                SELECT restaurant_id, COUNT(*) as reviews_count,TRUNC(AVG(rating), 1) AS average_rating 
                FROM reviews GROUP BY restaurant_id
            ) AS r 
                ON restaurants.id = r.restaurant_id
        `);

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results["rows"]
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            error: err.message
        });
    }
});

// get a restaurant
route.get("/restaurants/:id", async (req, res) => {
    try {
        const restaurant =await db.query(`
            SELECT * 
            FROM restaurants 
            LEFT JOIN (
                SELECT restaurant_id, COUNT(*) as reviews_count,TRUNC(AVG(rating), 1) AS average_rating 
                FROM reviews GROUP BY restaurant_id
            ) AS r 
                ON restaurants.id = r.restaurant_id
            WHERE id = $1
        `, [req.params.id]);
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            error: err.message
        });
    }
    
});

// Create a Restaurant
route.post("/restaurants", async (req, res) => {
    const { name, location, price_range } = req.body;
    try {
        const newAdd = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES($1, $2, $3) RETURNING *", [
            name, location, price_range
        ]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: newAdd.rows[0]
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            error: err.message
        });
    }
});

// Update Restaurant 
route.put("/restaurants/:id", async (req, res) => {
    const { name, location, price_range } = req.body;
    try {
        const updatedRestaurant = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [
            name, location, price_range, req.params.id
        ]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: updatedRestaurant.rows[0]
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            error: err.message
        });
    }
});

// Delete Restaurant
route.delete("/restaurants/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        
        res.status(200).json({
            status: "success"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            error: err.message
        });
    }
});

// Add Restaurant Review
route.post("/restaurants/:id/addReview", async (req, res) => {
    const { name, review, rating } = req.body;
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES($1, $2, $3, $4) RETURNING *", [
            req.params.id,
            name,
            review,
            rating
        ]);
        res.status(200).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "fail",
            error: err.message
        });
    }
});


module.exports = route;