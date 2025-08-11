import { ActionCreators } from '../app/expensesReducer';

const API_BASE_URL = 'https://expenses-backend-khizer.azurewebsites.net/api';

// Helper function to get authentication token
const getAuthToken = async (instance, accounts) => {
  if (!accounts || accounts.length === 0) {
    throw new Error('No authenticated account found');
  }

  const request = {
    scopes: ["User.Read"],
    account: accounts[0]
  };

  try {
    const response = await instance.acquireTokenSilent(request);
    return response.accessToken;
  } catch (error) {
    console.error('Token acquisition failed:', error);
    // Try interactive token acquisition
    try {
      const interactiveResponse = await instance.acquireTokenPopup(request);
      return interactiveResponse.accessToken;
    } catch (interactiveError) {
      console.error('Interactive token acquisition failed:', interactiveError);
      throw interactiveError;
    }
  }
};

export const GetExpenses = async (dispatch, msalInstance, accounts) => {
  try {
    console.log("Starting GetExpenses with authentication...");
    
    const token = await getAuthToken(msalInstance, accounts);
    
    const response = await fetch(`${API_BASE_URL}/Expenses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log("GetExpenses SUCCESS (authenticated):", data);
      dispatch(ActionCreators.setExpenses(data));
    } else {
      console.log("GetExpenses FAILED:", response.status);
    }
  } catch (error) {
    console.log("GetExpenses ERROR:", error);
  }
};

export const NewExpense = async (dispatch, expense, msalInstance, accounts) => {
  try {
    const token = await getAuthToken(msalInstance, accounts);
    
    const response = await fetch(`${API_BASE_URL}/Expenses`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: expense.description,
        amount: expense.amount,
        date: new Date().toISOString()
      })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(ActionCreators.newExpense(data));
    }
  } catch (error) {
    console.log("NewExpense Error:", error);
  }
};

export const EditExpense = async (dispatch, expense, msalInstance, accounts) => {
  try {
    const token = await getAuthToken(msalInstance, accounts);
    
    const response = await fetch(`${API_BASE_URL}/Expenses`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(expense)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(ActionCreators.editExpense(data));
    }
  } catch (error) {
    console.log("EditExpense Error:", error);
  }
};

export const DeleteExpense = async (dispatch, expense, msalInstance, accounts) => {
  try {
    const token = await getAuthToken(msalInstance, accounts);
    
    const response = await fetch(`${API_BASE_URL}/Expenses/${expense.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      dispatch(ActionCreators.deleteExpense(expense));
    }
  } catch (error) {
    console.log("DeleteExpense Error:", error);
  }
};