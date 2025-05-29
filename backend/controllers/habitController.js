const Habit = require('../models/Habit');

// Get all habits
const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new habit
const addHabit = async (req, res) => {
    try {
        const habit = new Habit(req.body);
        await habit.save();
        res.json(habit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Toggle habit completion
const toggleHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ error: 'Habit not found' });

        habit.completed = !habit.completed;
        await habit.save();
        res.json(habit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getHabits, addHabit, toggleHabit };
