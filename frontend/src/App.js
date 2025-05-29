import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Main App component
const App = () => {
    // State to store the list of habits and the new habit input
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //SMILE CORNER
    const messages = [
      "Your progress is AMAZING! 🌟",
      "Small steps lead to big changes!",
      "You're stronger than you think 💪",
      "Today matters more than yesterday 🚀",
      "Make yourself proud!"
    ];
    const [currentMessage, setCurrentMessage] = useState(messages[0]);





    // Fetch the list of habits from the backend when the component loads
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get('/api/habits');
          setHabits(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);

    // Function to add a new habit to the backend and update the UI
  const addHabit = async () => {
    if (!newHabit.trim()) return;
    
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/habits', { 
        name: newHabit,
        completed: false 
      });
      setHabits([...habits, data]);
      setNewHabit('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle the completion status of a habit
  const toggleHabit = async (id) => {
    try {
      await axios.patch(`/api/habits/${id}`);
      setHabits(habits.map(h => 
        h._id === id ? { ...h, completed: !h.completed } : h
      ));
    } catch (err) {
      setError(err.message);
    }
  };


  //NEW SMILE LANGUAGE
  const newSmile = () => {
    setCurrentMessage(prev => {
      const otherMessages = messages.filter(m => m !== prev);
      return otherMessages[Math.floor(Math.random() * otherMessages.length)];
    });
  };


  // Auto-rotate messages
  useEffect(() => {
    const timer = setInterval(newSmile, 10000);
    return () => clearInterval(timer);
  }, []);

  

  return (
    <div className="app">
      <header>
        <h1>🌱 Habit Garden</h1>
        <p className="subtitle">Grow your habits daily</p>
      </header>

      <main>
        <section className="habit-tracker">
          <div className="input-group">
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Add a new habit..."
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              disabled={isLoading}
            />
            <button 
              onClick={addHabit}
              disabled={isLoading || !newHabit.trim()}
            >
              {isLoading ? 'Adding...' : '+ Add'}
            </button>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <div className="habit-list">
            {isLoading ? (
              <div className="loader">Loading your habits...</div>
            ) : (
              habits.map(habit => (
                <div 
                  key={habit._id}
                  className={`habit-item ${habit.completed ? 'completed' : ''}`}
                  onClick={() => toggleHabit(habit._id)}
                >
                  <span className="habit-name">{habit.name}</span>
                  <span className="habit-status">
                    {habit.completed ? '✓' : '○'}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="smile-corner">
          <h2>☀️ Daily Sunshine</h2>
          <div className="message-box">
            <p>{currentMessage}</p>
          </div>
          <button 
            className="smile-btn"
            onClick={newSmile}
          >
            Shine Brighter 🌈
          </button>
        </section>
      </main>

      <footer>
        <p>Made with ❤️ for your growth</p>
      </footer>
    </div>
  );
};

useEffect(() => {
  const fetchData = async () => {
    try {
      // Try localStorage first for instant load
      const localData = localStorage.getItem('habits-backup');
      if (localData) {
        setHabits(JSON.parse(localData));
      }
      
      // Then fetch fresh data
      const { data } = await axios.get('/api/habits');
      setHabits(data);
      localStorage.setItem('habits-backup', JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, []);
  

const addHabit = async () => {
  if (!newHabit.trim()) return;
  
  try {
    setIsLoading(true);
    const { data } = await axios.post('/api/habits', { 
      name: newHabit,
      completed: false 
    });
    
    setHabits([...habits, data]);
    setNewHabit('');
    
    // Backup to localStorage
    localStorage.setItem('habits-backup', JSON.stringify([...habits, data]));
  } catch (err) {
    setError(err.message);
    // Fallback to localStorage if API fails
    const localHabits = JSON.parse(localStorage.getItem('habits-backup') || '[]');
    setHabits(localHabits);
  } finally {
    setIsLoading(false);
  }
};

const toggleHabit = async (id) => {
  try {
    await axios.patch(`/api/habits/${id}`);
    const updatedHabits = habits.map(h => 
      h._id === id ? { ...h, completed: !h.completed } : h
    );
    setHabits(updatedHabits);
    
    // Backup to localStorage
    localStorage.setItem('habits-backup', JSON.stringify(updatedHabits));
  } catch (err) {
    setError(err.message);
  }
};


// Configure Axios defaults (add right after imports)
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

// Add request interceptor to prevent 431 errors
axios.interceptors.request.use(config => {
  config.maxBodyLength = Infinity;
  config.maxContentLength = Infinity;
  return config;
});





export default App;