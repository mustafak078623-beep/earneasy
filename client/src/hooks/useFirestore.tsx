import { useState, useEffect } from 'react';
import { getUserData, getTransactions } from '../lib/firestore';
import { UserData, Transaction } from '../types';

export const useFirestore = (uid: string | null) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    if (!uid) return;

    try {
      setLoading(true);
      const [user, userTransactions] = await Promise.all([
        getUserData(uid),
        getTransactions(uid)
      ]);
      
      setUserData(user);
      setTransactions(userTransactions);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [uid]);

  return { userData, transactions, loading, error, refreshData };
};
