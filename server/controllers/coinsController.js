const axios = require('axios');
const CurrentData = require('../models/CurrentData');
const HistoryData = require('../models/HistoryData');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const COINS_PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 10,
  page: 1,
  price_change_percentage: '24h'
};

exports.getCoins = async (req, res) => {
  try {
    const coins = await CurrentData.find({});
    res.json(coins);
  } catch (error) {
    console.error('Error fetching coins from DB:', error.message);
    res.status(500).json({ error: 'Failed to fetch coins from database' });
  }
};

// POST /api/history
exports.postHistory = async (req, res) => {
  try {
    const response = await axios.get(COINGECKO_API_URL, { params: COINS_PARAMS });
    const coins = response.data.map(coin => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      priceUsd: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      lastUpdated: coin.last_updated,
      timestamp: new Date()
    }));

    // Insert new history records
    await HistoryData.insertMany(coins);

    res.json({ message: 'History data saved successfully' });
  } catch (error) {
    console.error('Error saving history data:', error.message);
    res.status(500).json({ error: 'Failed to save history data' });
  }
};

// GET /api/history/:coinId
exports.getHistoryByCoinId = async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await HistoryData.find({ coinId }).sort({ timestamp: 1 });
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error.message);
    res.status(500).json({ error: 'Failed to fetch history data' });
  }
};
