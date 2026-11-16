const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const upload= require('express-fileupload')
require('dotenv').config();

const app = express();

// Import Middleware
const {
    notFound,
    errorHandler
} = require('./middleware/errorMiddleware');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Built-in Middleware
app.use(express.json());
app.use(upload());
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error Middleware (Must be last)
app.use(notFound);
app.use(errorHandler);
const fileUpload =require('express-fileupload');
app.use(fileUpload());
// Database Connection + Server Start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(error => {
        console.log("MongoDB connection failed:", error);
    });
