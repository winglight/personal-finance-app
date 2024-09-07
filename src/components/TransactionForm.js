import React, { useState, useEffect } from 'react';
import api from '../api';
// import './TransactionForm.css';

function TransactionForm({ token, onClose }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    type: 'expense',
    category_id: '',
    account_id: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [inputMethod, setInputMethod] = useState('form');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/transaction', formData, {
        headers: { 'Authorization': token }
      });
      if (response.status === 200) {
        onClose();
      }
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="transaction-form">
      <button onClick={() => setInputMethod('form')}>Form</button>
      <button onClick={() => setInputMethod('chat')}>Chat</button>
      
      {inputMethod === 'form' ? (
        <form onSubmit={handleSubmit}>
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
          <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required />
          <select name="type" value={formData.type} onChange={handleInputChange} required>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select name="category_id" value={formData.category_id} onChange={handleInputChange} required>
            {categories.map(category => (
              <optgroup key={category.id} label={category.name}>
                {category.subcategories.map(subCategory => (
                  <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <select name="account_id" value={formData.account_id} onChange={handleInputChange} required>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>{account.name}</option>
            ))}
          </select>
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="chat-input">
          <textarea placeholder="Describe your transaction..."></textarea>
          <button>Send</button>
        </div>
      )}
    </div>
  );
}

export default TransactionForm;