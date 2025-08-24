import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getTransactions, withdrawFunds } from '../lib/firestore';
import { Transaction } from '../types';
import { useToast } from '../hooks/use-toast';
import RobotLoader from '../components/RobotLoader';

const Wallet: React.FC = () => {
  const { user, userData, refreshUserData } = useAuth();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await getTransactions(user.uid);
      setTransactions(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load transactions",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleWithdraw = () => {
    if (!user || !userData) return;

    const amount = parseFloat(withdrawAmount);
    
    if (amount < 50) {
      toast({
        title: "Minimum Amount Required",
        description: "Minimum withdrawal amount is $50.00",
        variant: "destructive",
      });
      return;
    }

    if (amount > userData.balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method.",
        variant: "destructive",
      });
      return;
    }

    // Open WhatsApp with admin for approval
    const adminWhatsApp = '+923001234567'; // Replace with actual admin WhatsApp
    const message = `Hi! I want to withdraw $${amount.toFixed(2)} via ${selectedMethod}. My email: ${user.email}`;
    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Admin Approval Required",
      description: "Please contact admin via WhatsApp for withdrawal approval. You've been redirected to admin chat.",
    });

    setWithdrawAmount('');
    setSelectedMethod('');
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const withdrawalMethods = [
    { id: 'jazzcash', name: 'JazzCash', icon: 'fa-mobile-alt', color: 'from-purple-500 to-pink-500' },
    { id: 'easypaisa', name: 'EasyPaisa', icon: 'fa-money-bill', color: 'from-green-500 to-teal-500' },
    { id: 'nayapay', name: 'NayaPay', icon: 'fa-credit-card', color: 'from-blue-500 to-indigo-500' },
    { id: 'sadapay', name: 'SadaPay', icon: 'fa-wallet', color: 'from-yellow-500 to-orange-500' },
    { id: 'bank', name: 'Bank Transfer', icon: 'fa-university', color: 'from-gray-500 to-gray-700' }
  ];

  if (!userData) return null;

  return (
    <>
      <RobotLoader isVisible={isLoading} message="Processing..." />
      
      {/* Balance Overview */}
      <div className="glass-effect rounded-2xl p-6 mb-6 neon-border" data-testid="wallet-overview">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Wallet Overview</h2>
          <button 
            onClick={loadTransactions}
            className="p-2 rounded-xl bg-gray-100 dark:bg-cyber-navy hover:bg-gray-200 dark:hover:bg-cyber-darker transition-all duration-300"
            data-testid="button-refresh"
          >
            <i className="fas fa-sync-alt text-gray-600 dark:text-gray-400"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center" data-testid="balance-available">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent mb-2">
              ${userData.balance.toFixed(2)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Available Balance</div>
          </div>
          <div className="text-center" data-testid="balance-total-earnings">
            <div className="text-3xl font-bold text-cyber-purple mb-2">
              ${userData.totalEarnings.toFixed(2)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Earnings</div>
          </div>
          <div className="text-center" data-testid="balance-withdrawn">
            <div className="text-3xl font-bold text-cyber-gold mb-2">
              ${userData.withdrawnAmount.toFixed(2)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Withdrawn</div>
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="border-t border-gray-200 dark:border-cyber-navy pt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Withdraw Funds</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {withdrawalMethods.map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                  selectedMethod === method.id
                    ? 'border-cyber-blue bg-cyber-blue/10 scale-105'
                    : 'border-gray-200 dark:border-cyber-navy hover:border-cyber-blue dark:hover:border-cyber-blue'
                }`}
                data-testid={`method-${method.id}`}
              >
                <div className={`w-8 h-8 bg-gradient-to-br ${method.color} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                  <i className={`fas ${method.icon} text-white text-sm`}></i>
                </div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{method.name}</div>
              </button>
            ))}
          </div>
          <div className="flex space-x-3">
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter amount (min $50)"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-cyber-navy bg-white dark:bg-cyber-darker text-gray-800 dark:text-white focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
              min="50"
              step="0.01"
              data-testid="input-withdraw-amount"
            />
            <button 
              onClick={handleWithdraw}
              disabled={!selectedMethod || !withdrawAmount || parseFloat(withdrawAmount) < 50 || userData.balance < 50}
              className="px-6 py-3 bg-gradient-to-r from-cyber-green to-cyber-gold text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyber-green/25 transition-all duration-300 disabled:opacity-50"
              data-testid="button-withdraw"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Request Withdrawal
            </button>
          </div>
          
          {/* Admin Approval Info */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <i className="fas fa-shield-alt text-blue-600 dark:text-blue-400"></i>
              <h4 className="font-semibold text-blue-800 dark:text-blue-300">Admin Approval Required</h4>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              All withdrawals require admin verification for security. You'll be redirected to WhatsApp to contact our admin.
            </p>
            <div className="text-xs text-blue-600 dark:text-blue-400">
              <i className="fab fa-whatsapp mr-1"></i>
              Admin WhatsApp: +92 300 123 4567
            </div>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            <i className="fas fa-info-circle mr-1"></i>
            Minimum withdrawal amount is $50. Admin approval required for all withdrawals.
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="glass-effect rounded-2xl p-6" data-testid="transaction-history">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Transaction History</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs rounded-lg transition-colors duration-300 ${
                filter === 'all' ? 'bg-cyber-blue text-white' : 'bg-gray-200 dark:bg-cyber-navy text-gray-700 dark:text-gray-300'
              }`}
              data-testid="filter-all"
            >
              All
            </button>
            <button 
              onClick={() => setFilter('earn')}
              className={`px-3 py-1 text-xs rounded-lg transition-colors duration-300 ${
                filter === 'earn' ? 'bg-cyber-blue text-white' : 'bg-gray-200 dark:bg-cyber-navy text-gray-700 dark:text-gray-300'
              }`}
              data-testid="filter-earn"
            >
              Earnings
            </button>
            <button 
              onClick={() => setFilter('withdraw')}
              className={`px-3 py-1 text-xs rounded-lg transition-colors duration-300 ${
                filter === 'withdraw' ? 'bg-cyber-blue text-white' : 'bg-gray-200 dark:bg-cyber-navy text-gray-700 dark:text-gray-300'
              }`}
              data-testid="filter-withdraw"
            >
              Withdrawals
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-cyber-darker rounded-xl" data-testid={`transaction-${transaction.id}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'earn' 
                      ? 'bg-gradient-to-br from-cyber-green to-cyber-gold' 
                      : 'bg-gradient-to-br from-red-500 to-pink-500'
                  }`}>
                    <i className={`fas ${transaction.type === 'earn' ? 'fa-plus' : 'fa-minus'} text-white text-sm`}></i>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{transaction.description}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'earn' ? 'text-cyber-green' : 'text-red-500'
                }`}>
                  {transaction.type === 'earn' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400" data-testid="no-transactions">
              <i className="fas fa-receipt text-4xl mb-4"></i>
              <p>No transactions yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wallet;
