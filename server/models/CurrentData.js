const mongoose = require('mongoose');

const CurrentDataSchema = new mongoose.Schema({
  coinId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  priceUsd: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  lastUpdated: { type: Date, required: true }
});

module.exports = mongoose.model('CurrentData', CurrentDataSchema);
