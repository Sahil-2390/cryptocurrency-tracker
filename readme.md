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

## API Testing with Postman

You can test the server API endpoints using Postman or any other API testing tool.

### API Endpoints

#### 1. Get Current Coins Data

- **Endpoint:** `GET /api/coins`  
- **Description:** Fetch the list of top 10 cryptocurrencies with their current details.

**Example Request:**

- Method: GET  
- URL: `http://localhost:5000/api/coins`

---

#### 2. Save History Data

- **Endpoint:** `POST /api/history`  
- **Description:** Fetch current coin data and save it as historical records in the database.

**Example Request:**

- Method: POST  
- URL: `http://localhost:5000/api/history`
- Body: No body required

---

#### 3. Get History Data by Coin ID

- **Endpoint:** `GET /api/history/:coinId`  
- **Description:** Retrieve historical data for a specific coin by its coinId.

**Example Request:**

- Method: GET  
- URL: `http://localhost:5000/api/history/bitcoin`  
  (Replace `bitcoin` with the desired coinId)

---

### Notes

- Ensure the server is running before making API requests.
- Adjust the port number if your server runs on a different port.


## Additional Information

- The client app fetches data from the server API and displays it in a searchable dashboard.
- The dashboard supports sorting by coin name and searching by coin name or symbol.
- The server-side API is built using Node.js and Express.js, utilizing the CoinGecko API
