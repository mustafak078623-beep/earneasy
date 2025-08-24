import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserData, createUserDocument } from '../lib/firestore';
import { UserData } from '../types';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUserData = async () => {
    if (user) {
      try {
        const data = await getUserData(user.uid);
        setUserData(data);
      } catch (error) {
        console.error('Error refreshing user data:', error);
        // Keep existing userData if refresh fails
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.email);
      setUser(user);
      
      if (user) {
        try {
          let data = await getUserData(user.uid);
          
          // Create user document if it doesn't exist
          if (!data) {
            console.log('Creating new user document for:', user.email);
            data = await createUserDocument(
              user.uid,
              user.email || '',
              user.displayName || user.email?.split('@')[0] || 'User'
            );
          }
          
          console.log('User data loaded:', data);
          setUserData(data);
        } catch (error) {
          console.error('Error loading user data:', error);
          // Create fallback user data if Firestore fails
          const fallbackData: UserData = {
            email: user.email || '',
            name: user.displayName || user.email?.split('@')[0] || 'User',
            balance: 0,
            adsWatched: 0,
            withdrawnAmount: 0,
            totalEarnings: 0,
            streak: 1,
            rank: 'bronze',
            createdAt: new Date().toISOString()
          };
          setUserData(fallbackData);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
