import React, { useState } from 'react';
import './App.css';
import AccountList from './components/AccountList';
import TransactionModal from './components/TransactionModal';
import { getVirtualAccounts, getTransactions } from './services/tatumApi';

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const handleFetchAccounts = async () => {
    if (!apiKey) {
      alert('Please enter an API Key');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await getVirtualAccounts(apiKey);
      setAccounts(data);
    } catch (err) {
      setError('Failed to load accounts. Please check your API key.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewTransactions = async (accountId) => {
    setIsModalOpen(true);
    setModalLoading(true);
    setSelectedTransactions([]);

    try {
      const data = await getTransactions(accountId, apiKey);
      setSelectedTransactions(data);
    } catch (err) {
      console.error('Failed to load transactions', err);
      // Optional: show error in modal
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Tatum Virtual Accounts Dashboard</h1>
      </header>

      <div className="controls-section">
        <input
          type="text"
          className="api-key-input"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Tatum API Key"
        />
        <button
          className="primary-btn"
          onClick={handleFetchAccounts}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Get Accounts'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="content-section">
        <AccountList
          accounts={accounts}
          onViewTransactions={handleViewTransactions}
        />
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transactions={selectedTransactions}
        isLoading={modalLoading}
      />
    </div>
  );
};

export default App;
