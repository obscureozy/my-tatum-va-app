export const getVirtualAccounts = async (apiKey) => {
  try {
    const response = await fetch('https://api.tatum.io/v3/ledger/account?pageSize=50&active=true', {
      headers: {
        'x-api-key': apiKey,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch accounts');
    
    const accounts = await response.json();
    
    // Fetch deposit addresses for all accounts in parallel
    const accountsWithAddresses = await Promise.all(
      accounts.map(async (account) => {
        const depositAddresses = await getDepositAddresses(account.id, apiKey);
        return {
          ...account,
          depositAddresses,
        };
      })
    );
    
    return accountsWithAddresses;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const getDepositAddresses = async (accountId, apiKey) => {
  try {
    const response = await fetch(
      `https://api.tatum.io/v3/offchain/account/${accountId}/address`,
      {
        headers: {
          'x-api-key': apiKey,
        },
      }
    );
    
    if (!response.ok) throw new Error(`Failed to fetch addresses for account ${accountId}`);
    
    const addresses = await response.json();
    return addresses.map(addr => addr.address);
  } catch (error) {
    console.error(`Error fetching deposit addresses for ${accountId}:`, error);
    return []; // Return empty array on failure to allow other data to load
  }
};

export const getTransactions = async (accountId, apiKey) => {
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

    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
