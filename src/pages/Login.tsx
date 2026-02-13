import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", damping: 20, stiffness: 100, duration: 0.6 }
  }
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success('Logged in successfully!');
      navigate('/admin'); // Or '/dashboard', adjust as needed
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during login.', {
        position: "top-right",
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 flex items-center justify-center relative overflow-hidden py-12">
      <ToastContainer />
      <motion.form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={loginVariants}
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
          Login
        </h2>
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
          required
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
          required
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-gray-200 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg flex items-center justify-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : null}
          {loading ? 'Processing...' : 'Login'}
        </button>
        
      </motion.form>
    </div>
  );
};

export default Login;