require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const coinsRoutes = require('./routes/coins');
const cronJob = require('./cron/job');
const updateCurrentDataJob = require('./cron/updateCurrentData');

const app = express();


// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', coinsRoutes);

  
// Start cron job
cronJob.start();
updateCurrentDataJob.start();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
