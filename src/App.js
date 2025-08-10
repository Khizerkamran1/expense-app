import React from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';  // ← Changed to ExpenseList (no 's')
import AuthenticationButton from './components/AuthenticationButton';
import { useIsAuthenticated } from '@azure/msal-react';

function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Tracker</h1>
        <AuthenticationButton />
      </header>
      
      {isAuthenticated ? (
        <main style={{ padding: '20px' }}>
          <ExpenseForm />
          <ExpenseList />   {/* ← Changed to ExpenseList (no 's') */}
        </main>
      ) : (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Authentication Required</h2>
          <p>Please sign in to access your expenses</p>
        </div>
      )}
    </div>
  );
}

export default App;