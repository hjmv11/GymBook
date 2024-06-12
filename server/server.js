require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const db = require("./db/conn");
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;

db()

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    //show path and method called
    console.log(req.path, req.method);
    next();
})

//api user routes
app.use("/api/gymbook", userRoutes);

//api workout routes
app.use("/api/gymbook", workoutRoutes);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    //Listen for server start 
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    })
})

mongoose.connection.on('error', err => {
    console.log(err)
})



