import React, { useState, useEffect } from 'react';

const VirtualAccounts = () => {
  const [apiKey, setApiKey] = useState('');
  const [accounts, setAccounts] = useState([]);

  const getVirtualAccounts = () => {
    fetch('https://api.tatum.io/v3/ledger/account?pageSize=50&active=true', {
      headers: {
        'x-api-key': apiKey,
      },
    })
      .then(response => response.json())
      .then(data => {
        const promises = data.map(account => getDepositAddresses(account.id));
        Promise.all(promises)
          .then(depositAddressesArray => {
            const updatedAccounts = data.map((account, index) => ({
              ...account,
              depositAddresses: depositAddressesArray[index].map(
                addressObj => addressObj.address
              ),
            }));
            setAccounts(updatedAccounts);
          })
          .catch(error => console.error('Error fetching deposit addresses:', error));
      })
      .catch(error => console.error('Error fetching accounts:', error));
  };

  const getDepositAddresses = accountId => {
    return fetch(
      `https://api.tatum.io/v3/offchain/account/${accountId}/address`,
      {
        headers: {
          'x-api-key': apiKey,
        },
      }
    ).then(response => response.json());
  };

  const getTransactions = async (accountId, apiKey) => {
    try {
      const response = await fetch('https://api.tatum.io/v3/ledger/transaction/account?pageSize=50', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          id: accountId,
          pageSize: 50,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Create a popup window to display transactions
      const popup = window.open('', '_blank', 'width=600,height=600');
      popup.document.write('<style>table{width:100%;border-collapse:collapse;margin-top:20px;}th,td{border:1px solid #ddd;padding:8px;text-align:left;}th{background-color:#4CAF50;color:white;}tbody tr:nth-child(even){background-color:#f2f2f2;}tbody tr:hover{background-color:#ddd;}</style><table><thead><tr><th>Amount</th><th>Operation Type</th><th>Currency</th><th>Transaction Type</th><th>Account ID</th><th>Reference</th><th>TX ID</th><th>Address</th><th>Created</th></tr></thead><tbody>');
      
      data.forEach(tx => {
        const date = new Date(tx.created);
        popup.document.write(`<tr><td>${tx.amount}</td><td>${tx.operationType}</td><td>${tx.currency}</td><td>${tx.transactionType}</td><td>${tx.accountId}</td><td>${tx.reference}</td><td>${tx.txId}</td><td>${tx.address}</td><td>${date.toISOString()}</td></tr>`);
      });

      popup.document.write('</tbody></table>');
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div>
      <h1>MY TATUM VIRTUAL ACCOUNTS</h1>
      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your API Key here"
      />
      <button onClick={getVirtualAccounts}>Get Virtual Accounts</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Balance</th>
            <th>Currency</th>
            <th>Active</th>
            <th>Deposit Addresses</th>
            <th>TXs</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.balance.accountBalance}</td>
              <td>{account.currency}</td>
              <td>{account.active}</td>
              <td>{account.depositAddresses.join(', ')}</td>
              <td>
                <button
                  onClick={() => getTransactions(account.id, apiKey)}
                >
                  Get TXs
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add the same CSS for the second table */}
      <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #4CAF50;
            color: white;
          }

          tbody tr:nth-child(even) {
            background-color: #f2f2f2;
          }

          tbody tr:hover {
            background-color: #ddd;
          }
        `}
      </style>
    </div>
  );
};

export default VirtualAccounts;
