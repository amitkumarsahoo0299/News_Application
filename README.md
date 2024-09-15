# News Application

## Description

A full-stack news application that allows users to search for news articles and view the results with pagination. The project is built with React for the frontend and Express for the backend.

### Features
- Search news articles by keywords
- Pagination to navigate through search results
- Display news articles with titles, descriptions, and images

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js & Express.js
- **API**: [NewsAPI](https://newsapi.org) for fetching news articles

## Installation

**Frontend (Client)**

1. Navigate to the `client` directory:
   ```bash
   cd client
2. Install the necessary dependencies:
   ```bash
    npm install
### Backend (Server)
1. Navigate to the server directory:
   ```bash
   cd ../server
3. Install the necessary dependencies:
   ```bash
   npm install
### Usage
### Frontend
1. Navigate to the client directory and start the development server:
   ```bash
   cd client
   npm start

The frontend will be available at http://localhost:3000.

### Backend
1. Navigate to the server directory and start the server:
   ```bash
   cd ../server
   npm start

The backend will be available at http://localhost:5000.

### API Configuration
1. Obtain an API key from NewsAPI.
2. Create a .env file in the server directory with the following content:
```bash
API_KEY=your_newsapi_key_here
