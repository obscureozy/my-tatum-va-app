import React from 'react';

const AccountList = ({ accounts, onViewTransactions }) => {
    if (!accounts || accounts.length === 0) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>No accounts found. Enter an API Key to fetch data.</div>;
    }

    return (
        <div className="account-list-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Balance</th>
                        <th>Currency</th>
                        <th>Active</th>
                        <th>Deposit Addresses</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account.id}>
                            <td>{account.id}</td>
                            <td>{account.balance?.accountBalance || '0'}</td>
                            <td>{account.currency}</td>
                            <td>{account.active ? 'Yes' : 'No'}</td>
                            <td>{account.depositAddresses ? account.depositAddresses.join(', ') : ''}</td>
                            <td>
                                <button
                                    onClick={() => onViewTransactions(account.id)}
                                    className="action-btn"
                                >
                                    View TXs
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountList;
