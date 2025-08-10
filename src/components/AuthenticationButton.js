import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

const AuthenticationButton = () => {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
  };

  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      {accounts.length > 0 ? (
        <div>
          <p>Welcome, {accounts[0].name}!</p>
          <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <p>Please sign in to view your expenses</p>
          <button onClick={handleLogin} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
            Sign In with Microsoft
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthenticationButton;