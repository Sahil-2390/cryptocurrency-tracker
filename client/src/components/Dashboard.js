import React, { useEffect, useState, useMemo, useRef } from 'react';
import { fetchCoins, fetchHistory } from '../api';
import './Dashboard.css';

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // New states for history data
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [errorHistory, setErrorHistory] = useState(null);

  // Ref for history section to scroll into view
  const historySectionRef = useRef(null);

  // Fetch coins data
  const loadCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCoins();
      setCoins(data);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
      setError('Failed to fetch coin data. Please try again later.');
    } finally {
      setLoading(false);
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

  // Filter coins by search term ignoring spaces
  const filteredCoins = useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, '');
    return coins.filter(
      (coin) => {
        const normalizedName = coin.name.toLowerCase().replace(/\s+/g, '');
        const normalizedSymbol = coin.symbol.toLowerCase().replace(/\s+/g, '');
        return normalizedName.includes(normalizedSearchTerm) || normalizedSymbol.includes(normalizedSearchTerm);
      }
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

  // Handle click on coin name button to fetch history and scroll to history section
  const handleCoinClick = async (coinId) => {
    if (selectedCoinId === coinId) {
      // If same coin clicked again, toggle off
      setSelectedCoinId(null);
      setHistoryData([]);
      setErrorHistory(null);
      return;
    }
    setSelectedCoinId(coinId);
    setLoadingHistory(true);
    setErrorHistory(null);
    setHistoryData([]);
    try {
      const data = await fetchHistory(coinId);
      setHistoryData(data);
      // Scroll to history section after data is set
      setTimeout(() => {
        if (historySectionRef.current) {
          historySectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Failed to fetch history:', error);
      setErrorHistory('Failed to fetch history data. Please try again later.');
    } finally {
      setLoadingHistory(false);
    }
  };

  return (
    <div className="container">
      {loading && <div className="loadingMessage">Loading data, please wait...</div>}
      {error && <div className="errorMessage">{error}</div>}
      {!loading && !error && (
        <>
          <div className="infoMessage" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            If you want to see the history of any coin, click on the coin name.
          </div>
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
                  <td className="td">
                    <button className="coinNameButton" onClick={() => handleCoinClick(coin.coinId)}>
                      {coin.name}
                    </button>
                  </td>
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

          {selectedCoinId && (
            <div className="historySection" ref={historySectionRef}>
              <h2>History Data for {sortedCoins.find(c => c.coinId === selectedCoinId)?.name}</h2>
              {loadingHistory && <div className="loadingMessage">Loading history data...</div>}
              {errorHistory && <div className="errorMessage">{errorHistory}</div>}
              {!loadingHistory && !errorHistory && historyData.length > 0 && (
                <table className="table historyTable">
                  <thead>
                    <tr>
                      <th className="th">Price (USD)</th>
                      <th className="th">Market Cap</th>
                      <th className="th">24h % Change</th>
                      <th className="th">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((entry, index) => (
                      <tr key={index}>
                        <td className="td">${entry.priceUsd ? Number(entry.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}</td>
                        <td className="td">${entry.marketCap ? Number(entry.marketCap).toLocaleString() : 'N/A'}</td>
                        <td className={`td ${entry.change24h >= 0 ? 'positiveChange' : 'negativeChange'}`}>
                          {entry.change24h !== undefined && entry.change24h !== null ? Number(entry.change24h).toFixed(2) : '0.00'}%
                        </td>
                        <td className="td">{entry.timestamp ? new Date(entry.timestamp).toLocaleString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {!loadingHistory && !errorHistory && historyData.length === 0 && (
                <div>No history data available for this coin.</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
