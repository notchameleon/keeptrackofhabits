# keeptrackofhabits

This is a full-stack habit tracking application built using React Native for the frontend and Node.js with Express and MongoDB for the backend. 
The app allows users to add, view, and toggle the completion status of habits.

Project Structure

App.js (Frontend):

Uses React Native to create a simple UI.

Fetches habits from the backend.

Allows users to add new habits.

Allows users to toggle the completion status of habits.



server.js (Backend):

Uses Express.js as the web server framework.

Connects to a MongoDB database using Mongoose.

Provides API endpoints for fetching, adding, and updating habits.

!!!!Prerequisites!!!!!

Before running the project, ensure you have the following installed:

Node.js

MongoDB

React Native

npm or yarn package manager

Installation



Backend Setup

Navigate to the backend directory (where server.js is located).

Install dependencies:

npm install express cors mongoose

Start MongoDB (ensure MongoDB is running on mongodb://localhost:27017/habitTracker).

Start the backend server:

node server.js

The server should now be running at http://localhost:3000.

Frontend Setup

Navigate to the frontend directory (where App.js is located).

Install dependencies:

npm install axios react-native

Start the React Native app:

npx react-native start

Run the app on an emulator or a physical device:

npx react-native run-android # For Android
npx react-native run-ios    # For iOS (Mac users)

Live Updates

To see live updates:

For Backend: Changes made in server.js require restarting the server. You can use nodemon to enable automatic restarts:

npm install -g nodemon
nodemon server.js

For Frontend: Changes in App.js will automatically reload in React Native when saved, as long as Metro Bundler (npx react-native start) is running.

API Endpoints

GET /habits - Fetches all habits.

POST /habits - Adds a new habit.

PATCH /habits/:id - Toggles completion status of a habit.

Troubleshooting

Ensure MongoDB is running before starting the backend server.

Check the terminal for any error messages.

Restart Metro Bundler (npx react-native start --reset-cache) if React Native changes are not reflecting.