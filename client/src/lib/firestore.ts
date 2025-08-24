import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  updateDoc,
  increment
} from "firebase/firestore";
import { db } from "./firebase";
import { UserData, Transaction } from "../types";

export const createUserDocument = async (uid: string, email: string, name: string): Promise<UserData> => {
  try {
    const userRef = doc(db, "users", uid);
    const userData: UserData = {
      email,
      name,
      balance: 0,
      adsWatched: 0,
      withdrawnAmount: 0,
      createdAt: new Date().toISOString(),
      totalEarnings: 0,
      streak: 1,
      rank: "bronze"
    };
    
    await setDoc(userRef, userData);
    console.log('User document created successfully for:', email);
    return userData;
  } catch (error) {
    console.error('Error creating user document:', error);
    // Return the userData anyway for fallback
    return {
      email,
      name,
      balance: 0,
      adsWatched: 0,
      withdrawnAmount: 0,
      createdAt: new Date().toISOString(),
      totalEarnings: 0,
      streak: 1,
      rank: "bronze"
    };
  }
};

export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      console.log('User data found for UID:', uid);
      return userSnap.data() as UserData;
    }
    console.log('No user data found for UID:', uid);
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error; // Re-throw to trigger fallback in AuthContext
  }
};

export const updateUserBalance = async (uid: string, amount: number) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      balance: increment(amount),
      totalEarnings: increment(amount),
      adsWatched: increment(1)
    });
    console.log('User balance updated successfully');
  } catch (error) {
    console.error('Error updating user balance:', error);
    throw error;
  }
};

export const addTransaction = async (uid: string, transaction: Omit<Transaction, "id" | "timestamp">) => {
  try {
    const transactionsRef = collection(db, "users", uid, "transactions");
    const transactionData = {
      ...transaction,
      timestamp: new Date().toISOString()
    };
    
    const result = await addDoc(transactionsRef, transactionData);
    console.log('Transaction added successfully');
    return result;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const getTransactions = async (uid: string, limitCount: number = 20): Promise<Transaction[]> => {
  try {
    const transactionsRef = collection(db, "users", uid, "transactions");
    const q = query(transactionsRef, orderBy("timestamp", "desc"), limit(limitCount));
    const querySnapshot = await getDocs(q);
    
    const transactions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Transaction[];
    
    console.log('Transactions loaded:', transactions.length);
    return transactions;
  } catch (error) {
    console.error('Error getting transactions:', error);
    return []; // Return empty array on error
  }
};

export const withdrawFunds = async (uid: string, amount: number, method: string) => {
  try {
    const userRef = doc(db, "users", uid);
    
    // Update user balance
    await updateDoc(userRef, {
      balance: increment(-amount),
      withdrawnAmount: increment(amount)
    });
    
    // Add transaction record
    await addTransaction(uid, {
      type: "withdraw",
      amount,
      method,
      description: `Withdrawal via ${method}`
    });
    
    console.log('Withdrawal processed successfully');
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    throw error;
  }
};
