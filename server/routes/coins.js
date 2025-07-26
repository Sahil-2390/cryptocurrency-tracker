const express = require('express');
const router = express.Router();
const coinsController = require('../controllers/coinsController');

router.get('/coins', coinsController.getCoins);
router.post('/history', coinsController.postHistory);
router.get('/history/:coinId', coinsController.getHistoryByCoinId);

module.exports = router;
