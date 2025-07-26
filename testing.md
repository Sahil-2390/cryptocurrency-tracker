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