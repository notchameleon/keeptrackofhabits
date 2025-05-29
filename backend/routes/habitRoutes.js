const express = require('express');
const router = express.Router();
const { getHabits, addHabit, toggleHabit } = require('../controllers/habitController');

// Define API Endpoints
router.get('/', getHabits);
router.post('/', addHabit);
router.patch('/:id', toggleHabit);

module.exports = router;
