import React, { useState, useEffect } from 'react';
import StatisticsPage from './components/StatisticsPage';
import TransactionForm from './components/TransactionForm';
import SettingsPage from './components/SettingsPage';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [currentPage, setCurrentPage] = useState('statistics');

  useEffect(() => {
    if (!token) {
      promptForToken();
    }
  }, []);

  const promptForToken = () => {
    const newToken = prompt('Please enter your token:');
    if (newToken) {
      setToken(newToken);
      localStorage.setItem('token', newToken);
    }
  };

  return (
    <div className="App">
      {currentPage === 'statistics' && <StatisticsPage token={token} />}
      {currentPage === 'transaction' && <TransactionForm token={token} onClose={() => setCurrentPage('statistics')} />}
      {currentPage === 'settings' && <SettingsPage token={token} onClose={() => setCurrentPage('statistics')} />}
      
      <button className="floating-button add-button" onClick={() => setCurrentPage('transaction')}>+</button>
      <button className="floating-button settings-button" onClick={() => setCurrentPage('settings')}>⚙️</button>
    </div>
  );
}

export default App;