import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView,
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
// Main App component
const App = () => {
    // State to store the list of habits and the new habit input
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');
    // Fetch the list of habits from the backend when the component loads
    useEffect(() => {
        axios.get('http://localhost:3000/habits')
        .then((response) => setHabits(response.data))
        .catch((error) => console.error(error));
    }, []);

    // Function to add a new habit to the backend and update the UI
  const addHabit = () => {
    if (newHabit.trim()) {
      axios.post('http://localhost:3000/habits', { name: newHabit })
        .then((response) => {
          setHabits([...habits, response.data]); // Add the new habit to the list
          setNewHabit(''); // Clear the input field
        })
        .catch((error) => console.error(error));
    }
  };

  // Function to toggle the completion status of a habit
  const toggleHabit = (id) => {
    const habit = habits.find((habit) => habit._id === id);
    axios.patch(`http://localhost:3000/habits/${id}`)
      .then(() => {
        setHabits(habits.map((habit) => {
          if (habit._id === id) {
            habit.completed = !habit.completed; // Toggle the completion status
          }
          return habit;
        }));
      })
      .catch((error) => console.error(error));
  };

  return (
    // SafeAreaView to ensure proper spacing on mobile devices
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Habit Tracker</Text>
      {/* Input field for adding a new habit */}
      <TextInput
        placeholder="Add a new habit"
        value={newHabit}
        onChangeText={setNewHabit}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }}
      />
      {/* Button to add the habit */}
      <Button title="Add Habit" onPress={addHabit} />
      {/* List of habits */}
      <FlatList
        data={habits}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          // TouchableOpacity to toggle the completion status of a habit
          <TouchableOpacity
            onPress={() => toggleHabit(item._id)}
            style={{
              padding: 10,
              backgroundColor: item.completed ? 'lightgreen' : 'lightgray',
              marginVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
