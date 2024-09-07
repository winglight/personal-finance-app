import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// import './StatisticsPage.css';

function StatisticsPage({ token }) {
  const [period, setPeriod] = useState('day');
  const [startDate, setStartDate] = useState(new Date());
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchTransactions();
  }, [period, startDate]);

  const fetchStats = async () => {
    const endDate = new Date(startDate);
    if (period === 'week') endDate.setDate(endDate.getDate() + 6);
    if (period === 'month') endDate.setMonth(endDate.getMonth() + 1);
    if (period === 'year') endDate.setFullYear(endDate.getFullYear() + 1);

    try {
      const response = await api.get(`/stats`, {
        params: {
          period: period,
          start_date: formatDate(startDate),
          end_date: formatDate(endDate)
        },
        headers: { 'Authorization': token }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await api.get(`/transaction`, {
        params: { start_date: formatDate(startDate) },
        headers: { 'Authorization': token }
      });
      setTransactions(response.data.items);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const navigate = (direction) => {
    const newDate = new Date(startDate);
    if (period === 'day') newDate.setDate(newDate.getDate() + direction);
    if (period === 'week') newDate.setDate(newDate.getDate() + direction * 7);
    if (period === 'month') newDate.setMonth(newDate.getMonth() + direction);
    if (period === 'year') newDate.setFullYear(newDate.getFullYear() + direction);
    setStartDate(newDate);
  };

  return (
    <div className="statistics-page">
      <div className="period-selector">
        <button onClick={() => setPeriod('day')}>Day</button>
        <button onClick={() => setPeriod('week')}>Week</button>
        <button onClick={() => setPeriod('month')}>Month</button>
        <button onClick={() => setPeriod('year')}>Year</button>
      </div>
      <div className="navigation">
        <button onClick={() => navigate(-1)}>←</button>
        <span>{formatDate(startDate)}</span>
        <button onClick={() => navigate(1)}>→</button>
      </div>
      {stats && (
        <div className="stats-summary">
          <p>Total Expenses: {stats.income_expense.find(item => item.type === 'expense')?.total || 0}</p>
          <p>Total Income: {stats.income_expense.find(item => item.type === 'income')?.total || 0}</p>
          <p>Total Balance: {stats.total_assets}</p>
        </div>
      )}
      {period !== 'day' && stats && (
  <Line 
    data={{
      labels: stats.labels,
      datasets: [{
        label: 'Income',
        data: stats.income,
        borderColor: 'green',
        fill: false
      }, {
        label: 'Expenses',
        data: stats.expenses,
        borderColor: 'red',
        fill: false
      }]
    }} 
    options={{
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }} 
  />
)}
      <div className="transaction-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <p>{transaction.date} - {transaction.amount} - {transaction.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatisticsPage;