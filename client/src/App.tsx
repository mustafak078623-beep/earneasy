import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Updates from "./pages/Updates";
import Account from "./pages/Account";
import RobotLoader from "./components/RobotLoader";

function AppContent() {
  const { user, loading } = useAuth();
  const [currentTab, setCurrentTab] = useState('home');

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'home':
        return <Home />;
      case 'wallet':
        return <Wallet />;
      case 'updates':
        return <Updates />;
      case 'account':
        return <Account />;
      default:
        return <Home />;
    }
  };

  if (loading) {
    return <RobotLoader isVisible={true} message="Initializing..." />;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      {renderCurrentTab()}
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <Toaster />
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
