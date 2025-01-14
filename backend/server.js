// import modules
const express = require('express'); // Framework for building web applications
const cors = require('cors'); 
const mongoose = require('mongoose'); // MongoDB object modeling tool

const app = express(); // Initialize Express app

//Middleware
app.use(cors()); // Middleware to enable CrossOriginResourceSharing
app.use(express.json()); // Middleware to parse JSON Requests

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/habitTracker', {
    useNewUrlParser: true, // Legacy MongoDB connection string parser (not needed in modern versions)
    useUnifiedTopology: true, // Modern server discovery and monitoring engine (not needed in modern versions)
  });
  
  // Define a schema for the Habit model
  const habitSchema = new mongoose.Schema({
    name: String, // Name of the habit
    completed: { type: Boolean, default: false }, // Completion status, default is false
  });

  // Create the Habit model
const Habit = mongoose.model('Habit', habitSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the Habit Tracker API!'); // Send a response for the root route
});

// Endpoint to fetch all habits
app.post('/habits', async (req, res) => {
  const habit = new Habit(req.body); // Create a new habit with the request body data
  await habit.save(); // Save the new habit to the database
  res.json(habit); // Send the saved habit as a JSON response
});

// Endpoint to add a new habit
app.post('/habits', async (req, res) => {
    const habit = new Habit(req.body);
    await habit.save();
    res.json(habit);
  });
  
  // Endpoint to toggle the completion status of a habit
  app.patch('/habits/:id', async (req, res) => {
    const habit = await Habit.findById(req.params.id); // Find the habit by ID
    habit.completed = !habit.completed;  // Toggle the completion status
    await habit.save(); // Save the updated habit to the database
    res.json(habit); // Send the updated habit as a JSON response
  });

  // Start the server on port 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));


  





