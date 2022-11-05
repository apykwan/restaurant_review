const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const restaurantRoute = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use('/api/v1', restaurantRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})