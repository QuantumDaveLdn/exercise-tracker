# Exercise Tracker

A RESTful API that allows users to track their exercise routines by creating user profiles and logging exercise activities.

## Project Background

This project is part of the freeCodeCamp "Back End Development and APIs" certification. It builds on skills acquired in previous sections:

* Managing Packages with NPM (✓ COMPLETED)
* Basic Node and Express (✓ COMPLETED)
* MongoDB and Mongoose (✓ COMPLETED)
* Backend APIs and Microservices Projects (⏳ IN PROGRESS)

## Features

This API provides the following endpoints:

- `POST /api/users` - Creates a new user
  - Request body: `{ username: String }`
  - Response: `{ username: String, _id: String }`

- `GET /api/users` - Retrieves all users
  - Response: Array of `{ _id: String, username: String }`

- `POST /api/users/:_id/exercises` - Adds an exercise to a user's log
  - Request body: `{ description: String, duration: Number, date: String (optional) }`
  - Response: `{ _id: String, username: String, description: String, duration: Number, date: String }`

- `GET /api/users/:_id/logs` - Retrieves a user's exercise log
  - Query parameters (optional): `from`, `to`, `limit`
  - Response: `{ _id: String, username: String, count: Number, log: Array }`

## Example Responses

### Creating a user:
```json
{
  "username": "fcc_test",
  "_id": "65fe92abc7c61e01dfd5c3f4"
}
```

### Adding an exercise:
```json
{
  "_id": "65fe92abc7c61e01dfd5c3f4",
  "username": "fcc_test",
  "date": "Mon Jan 01 2024",
  "duration": 30,
  "description": "morning run"
}
```

### Getting a user's exercise log:
```json
{
  "_id": "65fe92abc7c61e01dfd5c3f4",
  "username": "fcc_test",
  "count": 2,
  "log": [
    {
      "description": "morning run",
      "duration": 30,
      "date": "Mon Jan 01 2024"
    },
    {
      "description": "evening yoga",
      "duration": 45,
      "date": "Tue Jan 02 2024"
    }
  ]
}
```

## Technologies Used

- Node.js
- Express.js
- MongoDB (with ObjectId for unique identifiers)

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your MongoDB connection string and port:
   ```
   PORT=3000
   ```
4. Start the server:
   ```
   npm start
   ```
5. Visit `http://localhost:3000` in your browser to access the user interface

## Project Structure

- `index.js` - The main application file with the server configuration and API endpoints
- `views/index.html` - The front-end interface for interacting with the API
- `public/style.css` - Styling for the front-end interface

## Skills Acquired

* RESTful API design principles
* CRUD operations implementation
* Express route handling
* Query parameter processing
* Date filtering and formatting
* In-memory data handling (with potential for MongoDB integration)
* Form data processing
* Client-server interaction
* HTTP method implementation (GET, POST)
* JSON response formatting

*This project demonstrates practical backend development skills for building fitness tracking applications, which could be expanded with additional features like data visualization, user authentication, and mobile integration.*
