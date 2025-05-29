// import modules
require('dotenv').config(); // Load environment variables
const express = require('express'); // Framework for building web applications
const cors = require('cors'); 
const connectDB = require('./config/db');
const habitRoutes = require('./routes/habitRoutes');
const path = require('path');


const app = express(); // Initialize Express app

// Add this BEFORE your routes
app.use(express.json({ limit: '10mb' }));  // Increased from default 100kb
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: ['Content-Length'] //Prevents 431 How?? IDK 
}));

//Middleware
app.use(cors()); // Middleware to enable CrossOriginResourceSharing
app.use(express.json()); // Middleware to parse JSON Requests
app.use(express.urlencoded({ extended: true}));

// Connect to MongoDB 
connectDB();


//root route
app.get('/', (req, res) => {
  res.send('Welcome to the Habit Tracker API!'); // Send a response for the root route
});

// Habit Routes
app.use('/api/habits', habitRoutes);

// Serve static files from React
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


app.use((req, res, next) => {
  console.log('Request headers size:', 
    JSON.stringify(req.headers).length);
  next();
});

  // Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


  





