# Tatum Virtual Accounts Dashboard

A React-based dashboard for managing Tatum Virtual Accounts. This application allows you to view your virtual accounts, check balances, and inspect transactions.

## Features

-   **View Accounts**: List all virtual accounts associated with your API key.
-   **Check Balances**: View current balances for each account.
-   **Deposit Addresses**: See deposit addresses for your accounts.
-   **Transaction History**: Inspect transactions for specific accounts in a convenient modal view.

## Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   A Tatum API Key (Get one at [tatum.io](https://tatum.io/))

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd my-tatum-va-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

1.  Start the development server:
    ```bash
    npm start
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

3.  Enter your **Tatum API Key** in the input field and click **"Get Accounts"**.

4.  Click **"View TXs"** on any account to see its transaction history.

## Project Structure

-   `src/components`: UI components (`AccountList`, `TransactionModal`).
-   `src/services`: API communication logic (`tatumApi.js`).
-   `src/App.js`: Main application controller.

## Technologies

-   React
-   CSS3 (Custom styling)
-   Tatum API
