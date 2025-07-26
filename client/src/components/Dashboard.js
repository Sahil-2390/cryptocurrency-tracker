import React, { useEffect, useState, useMemo } from 'react';
import { fetchCoins } from '../api';
import './Dashboard.css';

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch coins data
  const loadCoins = async () => {
    try {
      const data = await fetchCoins();
      setCoins(data);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
    }
  };

  useEffect(() => {
    loadCoins();

    // Auto-refresh every 30 minutes
    const interval = setInterval(() => {
      loadCoins();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter coins by search term
  const filteredCoins = useMemo(() => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coins, searchTerm]);

  // Sort coins
  const sortedCoins = useMemo(() => {
    if (!sortField) return filteredCoins;

    const sorted = [...filteredCoins].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredCoins, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search by name or symbol"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className="th sortable">
              Coin Name
            </th>
            <th className="th">
              Symbol
            </th>
            <th className="th">
              Current Price (USD)
            </th>
            <th className="th">
              Market Cap
            </th>
            <th className="th">
              24h % Change
            </th>
            <th className="th">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.map((coin) => (
            <tr key={coin.coinId}>
              <td className="td">{coin.name}</td>
              <td className="td">{coin.symbol.toUpperCase()}</td>
              <td className="td">
                ${coin.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="td">${coin.marketCap.toLocaleString()}</td>
              <td className={`td ${coin.change24h >= 0 ? 'positiveChange' : 'negativeChange'}`}>
                {coin.change24h ? coin.change24h.toFixed(2) : '0.00'}%
              </td>
              <td className="td">{new Date(coin.lastUpdated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
