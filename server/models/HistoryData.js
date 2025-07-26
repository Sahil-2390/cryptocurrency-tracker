const mongoose = require('mongoose');

const HistoryDataSchema = new mongoose.Schema({
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  priceUsd: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  lastUpdated: { type: Date, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HistoryData', HistoryDataSchema);
