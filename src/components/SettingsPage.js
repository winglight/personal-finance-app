import React, { useState, useEffect } from 'react';
import api from '../api';
// import './SettingsPage.css';

function SettingsPage({ token, onClose }) {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchAccounts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories/hierarchical', {
        headers: { 'Authorization': token }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await api.get('/account', {
        headers: { 'Authorization': token }
      });
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const addCategory = async (type, name, parentId = null) => {
    try {
      const response = await api.post('/category', 
        { name, type, parent_id: parentId },
        { headers: { 'Authorization': token } }
      );
      if (response.status === 200) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const addAccount = async (name, currency) => {
    try {
      const response = await api.post('/account', 
        { name, currency },
        { headers: { 'Authorization': token } }
      );
      if (response.status === 200) {
        fetchAccounts();
      }
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  return (
    <div className="settings-page">
      <h2>Categories</h2>
      {categories.map(category => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.subcategories.map(subCategory => (
              <li key={subCategory.id}>{subCategory.name}</li>
            ))}
          </ul>
          <button onClick={() => addCategory(category.type, prompt('Enter subcategory name:'), category.id)}>
            Add Subcategory
          </button>
        </div>
      ))}
      <button onClick={() => addCategory('expense', prompt('Enter category name:'))}>Add Expense Category</button>
      <button onClick={() => addCategory('income', prompt('Enter category name:'))}>Add Income Category</button>

      <h2>Accounts</h2>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>{account.name} ({account.currency})</li>
        ))}
      </ul>
      <button onClick={() => addAccount(prompt('Enter account name:'), prompt('Enter currency:'))}>Add Account</button>

      <h2>Token</h2>
      <p>Current token: {token}</p>
      <button onClick={() => {
        const newToken = prompt('Enter new token:');
        if (newToken) {
          localStorage.setItem('token', newToken);
          window.location.reload();
        }
      }}>Change Token</button>

      <button onClick={onClose}>Close Settings</button>
    </div>
  );
}

export default SettingsPage;