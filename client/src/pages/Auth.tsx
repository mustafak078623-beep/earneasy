import React, { useState } from 'react';
import { signIn, signUp, resetPassword } from '../lib/auth';
import { useToast } from '../hooks/use-toast';
import RobotLoader from '../components/RobotLoader';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your account.",
        });
      } else {
        await signUp(email, password);
        toast({
          title: "Account created!",
          description: "Please check your email for verification.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const handleToggle = (mode: 'login' | 'register') => {
    setIsLogin(mode === 'login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <RobotLoader isVisible={isLoading} />
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-gray-900 opacity-80"></div>
      
      {/* Main Container */}
      <div className="relative w-80 h-[480px] bg-gray-800 rounded-lg overflow-hidden border border-cyan-400/20 shadow-2xl">
        
        {/* Animated Border Lines */}
        <div className="absolute top-0 right-0 w-48 h-0.5 bg-gradient-to-l from-transparent via-cyan-400 to-cyan-400 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-0.5 h-48 bg-gradient-to-t from-transparent via-cyan-400 to-cyan-400 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-0.5 bg-gradient-to-l from-transparent via-cyan-400 to-cyan-400 animate-pulse"></div>
        <div className="absolute left-0 top-0 w-0.5 h-48 bg-gradient-to-t from-transparent via-cyan-400 to-cyan-400 animate-pulse"></div>

        {/* Inner Container */}
        <div className="relative w-full h-full bg-gray-700/90 p-1">
          
          {/* Background Slider */}
          <div 
            className={`absolute top-0 w-1/2 h-full bg-gradient-to-br from-gray-600 to-gray-800 transition-all duration-500 z-0 ${
              isLogin ? 'left-1/2' : 'left-0'
            }`}
          ></div>

          {/* Toggle Buttons */}
          <div className="relative z-10 w-56 mx-auto mt-8 mb-6 bg-gray-600/50 rounded-full p-1 flex">
            <div 
              className={`absolute top-1 w-28 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full transition-all duration-500 ${
                isLogin ? 'left-1' : 'left-28'
              }`}
            ></div>
            <button
              type="button"
              onClick={() => handleToggle('login')}
              className={`relative z-10 w-28 h-10 text-sm font-bold transition-colors duration-500 ${
                isLogin ? 'text-gray-900' : 'text-gray-200'
              }`}
              data-testid="toggle-login"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => handleToggle('register')}
              className={`relative z-10 w-28 h-10 text-sm font-bold transition-colors duration-500 ${
                !isLogin ? 'text-gray-900' : 'text-gray-200'
              }`}
              data-testid="toggle-register"
            >
              Register
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center border border-gray-500 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 cursor-pointer">
              <i className="fab fa-facebook text-cyan-400 text-lg"></i>
            </div>
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center border border-gray-500 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 cursor-pointer">
              <i className="fab fa-instagram text-cyan-400 text-lg"></i>
            </div>
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center border border-gray-500 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 cursor-pointer">
              <i className="fab fa-github text-cyan-400 text-lg"></i>
            </div>
          </div>

          {/* Forms Container */}
          <div className="relative overflow-hidden h-80">
            
            {/* Login Form */}
            <form 
              onSubmit={handleSubmit}
              className={`absolute top-0 w-full px-8 transition-all duration-500 ${
                isLogin ? 'left-0' : '-left-full'
              }`}
              data-testid="login-form"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 mb-4 bg-transparent border-0 border-l-2 border-b-2 border-cyan-400 text-gray-200 placeholder-gray-400 focus:outline-none focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300"
                required
                data-testid="input-email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 mb-6 bg-transparent border-0 border-l-2 border-b-2 border-cyan-400 text-gray-200 placeholder-gray-400 focus:outline-none focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300"
                required
                minLength={6}
                data-testid="input-password"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-4/5 mx-auto block py-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 disabled:opacity-50"
                data-testid="button-login"
              >
                Log in
              </button>
            </form>

            {/* Register Form */}
            <form 
              onSubmit={handleSubmit}
              className={`absolute top-0 w-full px-8 transition-all duration-500 ${
                !isLogin ? 'left-0' : 'left-full'
              }`}
              data-testid="register-form"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-3 mb-4 bg-transparent border-0 border-l-2 border-b-2 border-cyan-400 text-gray-200 placeholder-gray-400 focus:outline-none focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300"
                required
                data-testid="input-name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 mb-4 bg-transparent border-0 border-l-2 border-b-2 border-cyan-400 text-gray-200 placeholder-gray-400 focus:outline-none focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300"
                required
                data-testid="input-email-register"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 mb-6 bg-transparent border-0 border-l-2 border-b-2 border-cyan-400 text-gray-200 placeholder-gray-400 focus:outline-none focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300"
                required
                minLength={6}
                data-testid="input-password-register"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-4/5 mx-auto block py-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 disabled:opacity-50"
                data-testid="button-register"
              >
                Register
              </button>
            </form>
          </div>

          {/* Brand */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-lg font-bold text-cyan-400 mb-1">EarnEasy Pro</h1>
            <p className="text-xs text-gray-400">Watch Videos & Earn Money</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
