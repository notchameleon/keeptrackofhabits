const mongoose = require('mongoose'); // MongoDB object modeling tool
//Habitschema
const habitSchema = new mongoose.Schema({
    name: String, // Name of the habit
    completed: { type: Boolean, default: false }, // Completion status, default is false
  });

// Export Habit model
module.exports = mongoose.model('Habit', habitSchema);