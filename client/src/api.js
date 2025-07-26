import axios from 'axios';

const API_BASE_URL ='https://cryptocurrency-tracker-1.onrender.com/api';

export const fetchCoins = async () => {
  const response = await axios.get(`${API_BASE_URL}/coins`);
  return response.data;
};

export const fetchHistory = async (coinId) => {
  const response = await axios.get(`${API_BASE_URL}/history/${coinId}`);
  return response.data;
};
