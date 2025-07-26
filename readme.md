# Cryptocurrency Tracker Project

## Overview
This project is a Cryptocurrency Tracker application consisting of a client-side React app and a server-side API. The client displays cryptocurrency data fetched from the server API, including sorting and searching features.

## Running the Project

### Prerequisites
- Node.js and npm installed on your machine

### Running the Server
1. Navigate to the `server` directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
   The server will start on the configured port (default is 3001).

### Running the Client
1. Navigate to the `client` directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the client:
   ```
   npm start
   ```
   The client will start on the configured port (default is 3000) and open in your default browser.

## Additional Information

- The client app fetches data from the server API and displays it in a searchable dashboard.
- The dashboard supports sorting by coin name and searching by coin name or symbol.
- The server-side API is built using Node.js and Express.js, utilizing the CoinGecko API

## Tech Stack Used
- Frontend: React, axios
- Backend: Node.js, Express.js, MongoDB, Mongoose, axios
- Other: node-cron (for scheduled jobs), dotenv (for environment variables), cors (for cross-origin resource sharing)


## How the Cron Job Works

There are two cron jobs running in the backend:

1. **Current Data Update Job**  
   - Runs every 5 minutes.  
   - Fetches the top 10 cryptocurrencies data from the CoinGecko API.  
   - Updates the `CurrentData` collection in the database with the latest data.

2. **History Data Save Job**  
   - Runs every hour (at minute 0 of every hour).  
   - Fetches the top 10 cryptocurrencies data from the CoinGecko API.  
   - Inserts the data as new records into the `HistoryData` collection with a timestamp.

## Deployed Links

- Frontend: https://crypto-tracker-by-sahil.netlify.app/
- Backend: https://cryptocurrency-tracker-1.onrender.com
