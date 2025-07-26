const cron = require('node-cron');
const axios = require('axios');
const HistoryData = require('../models/HistoryData');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const COINS_PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 10,
  page: 1,
  price_change_percentage: '24h'
};

const task = cron.schedule('0 * * * *', async () => {
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

    await HistoryData.insertMany(coins);
    console.log('History data saved by cron job at', new Date().toISOString());
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
});

module.exports = task;
