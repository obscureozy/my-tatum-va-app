import React from 'react';
import './TransactionModal.css';

const TransactionModal = ({ isOpen, onClose, transactions, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <h2>Account Transactions</h2>
                </div>

                <div className="modal-body">
                    {isLoading ? (
                        <div className="text-center">Loading transactions...</div>
                    ) : transactions.length === 0 ? (
                        <p>No transactions found for this account.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Op Type</th>
                                    <th>Currency</th>
                                    <th>Tx Type</th>
                                    <th>Reference</th>
                                    <th>Tx ID</th>
                                    <th>Address</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.txId || Math.random()}>
                                        <td>{tx.amount}</td>
                                        <td>{tx.operationType}</td>
                                        <td>{tx.currency}</td>
                                        <td>{tx.transactionType}</td>
                                        <td>{tx.reference}</td>
                                        <td>{tx.txId}</td>
                                        <td>{tx.address}</td>
                                        <td>{new Date(tx.created).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
