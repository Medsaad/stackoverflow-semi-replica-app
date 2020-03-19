const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

// connect to database
require('./api/connection');


const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: process.env.FRONTEND,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('API Home');
});
app.use('/users', require('./api/routes/userRoutes'));
app.use('/questions', require('./api/routes/questionRoutes'));
/* app.use('/answers', require('./api/routes/answerRoutes')); */

app.listen(port, () => {
    console.log(`Node.js + MongoDB RESTful API server started on: ${port}`);
});
