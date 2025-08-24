export interface UserData {
  email: string;
  name: string;
  balance: number;
  adsWatched: number;
  withdrawnAmount: number;
  totalEarnings: number;
  streak: number;
  rank: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: "earn" | "withdraw";
  amount: number;
  method?: string;
  description: string;
  timestamp: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
}

export interface PlatformStats {
  totalWithdrawals: string;
  totalUsers: string;
  totalVisitors: string;
}
